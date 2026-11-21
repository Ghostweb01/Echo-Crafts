import { LearnerProgress, OfflinePackState, TrackId, VoiceVerificationRecord } from '../types/curriculum';
import { getTrackById, SKILL_TRACKS } from '../data/curriculum';

const DB_NAME = 'sautilearn_offline_db';
const DB_VERSION = 1;
const STORE_PROGRESS = 'progress';
const STORE_PACKS = 'offline_packs';
const STORE_AUDIO = 'voice_recordings';
const LS_PROGRESS_KEY = 'sautilearn_progress_v1';
const LS_PACKS_KEY = 'sautilearn_packs_v1';

const todayISO = () => new Date().toISOString().slice(0, 10);

export const DEFAULT_PROGRESS: LearnerProgress = {
  preferredLanguage: 'en',
  speechRate: 1.0,
  completedLessons: [],
  completedPractices: [],
  verifications: [],
  activeDates: [todayISO()],
  lastOpenedLessonId: 'bk-1',
};

function openDB(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
          db.createObjectStore(STORE_PROGRESS);
        }
        if (!db.objectStoreNames.contains(STORE_PACKS)) {
          db.createObjectStore(STORE_PACKS, { keyPath: 'trackId' });
        }
        if (!db.objectStoreNames.contains(STORE_AUDIO)) {
          db.createObjectStore(STORE_AUDIO);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function loadProgress(): Promise<LearnerProgress> {
  const db = await openDB();
  if (db) {
    try {
      const val = await new Promise<LearnerProgress | undefined>((resolve) => {
        const tx = db.transaction(STORE_PROGRESS, 'readonly');
        const req = tx.objectStore(STORE_PROGRESS).get('learner');
        req.onsuccess = () => resolve(req.result as LearnerProgress | undefined);
        req.onerror = () => resolve(undefined);
      });
      if (val) {
        return { ...DEFAULT_PROGRESS, ...val };
      }
    } catch {
      // fall through to localStorage
    }
  }

  try {
    const raw = localStorage.getItem(LS_PROGRESS_KEY);
    if (raw) {
      return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_PROGRESS };
}

export async function saveProgress(progress: LearnerProgress): Promise<void> {
  const today = todayISO();
  const updated: LearnerProgress = {
    ...progress,
    activeDates: progress.activeDates.includes(today)
      ? progress.activeDates
      : [...progress.activeDates, today],
  };

  try {
    localStorage.setItem(LS_PROGRESS_KEY, JSON.stringify(updated));
  } catch {
    // ignore quota errors
  }

  const db = await openDB();
  if (db) {
    try {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_PROGRESS, 'readwrite');
        tx.objectStore(STORE_PROGRESS).put(updated, 'learner');
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch {
      // ignore
    }
  }
}

export async function loadOfflinePacks(): Promise<OfflinePackState[]> {
  const db = await openDB();
  if (db) {
    try {
      const rows = await new Promise<OfflinePackState[]>((resolve) => {
        const tx = db.transaction(STORE_PACKS, 'readonly');
        const req = tx.objectStore(STORE_PACKS).getAll();
        req.onsuccess = () => resolve((req.result as OfflinePackState[]) || []);
        req.onerror = () => resolve([]);
      });
      if (rows.length > 0) return rows;
    } catch {
      // fallback
    }
  }

  try {
    const raw = localStorage.getItem(LS_PACKS_KEY);
    if (raw) return JSON.parse(raw) as OfflinePackState[];
  } catch {
    // ignore
  }

  // Default: pre-cache the starter Bookkeeping pack on first launch so offline lessons work out of the box
  const starterTrack = SKILL_TRACKS[0];
  const initial: OfflinePackState[] = [
    {
      trackId: starterTrack.id,
      downloadedAt: new Date().toISOString(),
      sizeKb: starterTrack.packSizeKb,
      lessonCount: starterTrack.lessons.length,
    },
  ];
  await persistOfflinePacks(initial);
  return initial;
}

async function persistOfflinePacks(packs: OfflinePackState[]): Promise<void> {
  try {
    localStorage.setItem(LS_PACKS_KEY, JSON.stringify(packs));
  } catch {
    // ignore
  }
  const db = await openDB();
  if (db) {
    try {
      await new Promise<void>((resolve) => {
        const tx = db.transaction(STORE_PACKS, 'readwrite');
        const store = tx.objectStore(STORE_PACKS);
        store.clear();
        for (const p of packs) store.put(p);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch {
      // ignore
    }
  }
}

export async function downloadTrackPack(trackId: TrackId): Promise<OfflinePackState[]> {
  const track = getTrackById(trackId);
  // Warm Cache Storage with track image & app assets if Cache API is available
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open('sautilearn-lessons-v1');
      await cache.addAll([track.imageUrl]);
    } catch {
      // Ignore if asset caching fails in constrained environment
    }
  }

  const current = await loadOfflinePacks();
  const filtered = current.filter((p) => p.trackId !== trackId);
  const next: OfflinePackState[] = [
    ...filtered,
    {
      trackId,
      downloadedAt: new Date().toISOString(),
      sizeKb: track.packSizeKb,
      lessonCount: track.lessons.length,
    },
  ];
  await persistOfflinePacks(next);
  return next;
}

export async function removeTrackPack(trackId: TrackId): Promise<OfflinePackState[]> {
  const current = await loadOfflinePacks();
  const next = current.filter((p) => p.trackId !== trackId);
  await persistOfflinePacks(next);
  return next;
}

export async function saveVoiceRecording(key: string, blob: Blob): Promise<void> {
  const db = await openDB();
  if (!db) return;
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_AUDIO, 'readwrite');
      tx.objectStore(STORE_AUDIO).put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

export async function loadVoiceRecording(key: string): Promise<Blob | null> {
  const db = await openDB();
  if (!db) return null;
  try {
    return await new Promise<Blob | null>((resolve) => {
      const tx = db.transaction(STORE_AUDIO, 'readonly');
      const req = tx.objectStore(STORE_AUDIO).get(key);
      req.onsuccess = () => resolve((req.result as Blob) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function resetAllProgress(): Promise<LearnerProgress> {
  const fresh = { ...DEFAULT_PROGRESS, activeDates: [todayISO()] };
  await saveProgress(fresh);
  return fresh;
}

export function calculateStreakDays(activeDates: string[]): number {
  if (activeDates.length === 0) return 0;
  const sorted = Array.from(new Set(activeDates)).sort().reverse();
  const today = new Date(todayISO());
  let streak = 0;

  for (let i = 0; i < sorted.length; i++) {
    const d = new Date(sorted[i]);
    const diffDays = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === streak || (streak === 0 && diffDays <= 1)) {
      streak = diffDays === 0 ? streak + 1 : diffDays + 1;
    } else {
      break;
    }
  }
  return Math.max(streak, sorted.includes(todayISO()) ? 1 : 0);
}

export function exportProgressJson(progress: LearnerProgress, verifications: VoiceVerificationRecord[]) {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'EchoCraft Offline Learner Record',
    ...progress,
    verifications,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `echocraft-progress-${todayISO()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
