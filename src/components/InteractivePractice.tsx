import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { PracticeKind } from '../types/curriculum';

interface InteractivePracticeProps {
  kind: PracticeKind;
  isCompleted: boolean;
  onComplete: () => void;
}

export const InteractivePractice: React.FC<InteractivePracticeProps> = ({
  kind,
  isCompleted,
  onComplete,
}) => {
  // Bookkeeping 1: Split drawer state
  const [splitSelections, setSplitSelections] = useState<Record<string, 'shop' | 'home' | null>>({
    flour: null,
    schoolFees: null,
    transport: null,
    dinner: null,
  });

  // Bookkeeping 2: Daily ledger balance state
  const [ledgerAnswer, setLedgerAnswer] = useState('');
  const [ledgerStatus, setLedgerStatus] = useState<'idle' | 'pass' | 'retry'>('idle');

  // Bookkeeping 3: Profit calculator sliders
  const [wholesaleCost, setWholesaleCost] = useState(140);
  const [transportCost, setTransportCost] = useState(20);
  const totalSales = 240;

  // Farming 1: Zai pit & mulch moisture simulator
  const [basinDepthCm, setBasinDepthCm] = useState(10);
  const [mulchCoverPct, setMulchCoverPct] = useState(20);

  // Farming 2: Compost 3:1 Brown-to-Green mixer
  const [brownBuckets, setBrownBuckets] = useState(1);
  const [greenBuckets, setGreenBuckets] = useState(1);

  // Farming 3: Companion plot selector
  const [plotRow2, setPlotRow2] = useState<'maize' | 'beans' | 'stones'>('maize');
  const [plotBorder, setPlotBorder] = useState<'bare' | 'marigold'>('bare');

  // Digital 1: Scam caller analyzer
  const [scamAction, setScamAction] = useState<'share' | 'hangup' | null>(null);

  // Digital 2: Receipt verification checklist
  const [receiptChecks, setReceiptChecks] = useState({
    ownPhone: false,
    senderId: false,
    newBalance: false,
  });

  // Digital 3: Data saver toggles
  const [dataSettings, setDataSettings] = useState({
    dataSaver: false,
    autoVideoOff: false,
    wifiPacks: false,
  });

  const renderCompletedBanner = () =>
    isCompleted ? (
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#047857] dark:text-[#34D399]">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>Hands-on exercise completed</span>
      </div>
    ) : null;

  if (kind === 'bookkeeping-split') {
    const items = [
      { id: 'flour', label: 'Wholesale Maize Flour ($45)', expected: 'shop' as const },
      { id: 'schoolFees', label: 'Child School Uniform ($18)', expected: 'home' as const },
      { id: 'transport', label: 'Market Delivery Cart ($6)', expected: 'shop' as const },
      { id: 'dinner', label: 'Family Evening Meal ($9)', expected: 'home' as const },
    ];
    const allChosen = items.every((i) => splitSelections[i.id] !== null);
    const allCorrect = items.every((i) => splitSelections[i.id] === i.expected);

    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
              Practice: Sort Cash Into the Right Envelope
            </h3>
            <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
              Assign each expense to either the Shop Cash Box or Household Pouch.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setSplitSelections({ flour: null, schoolFees: null, transport: null, dinner: null })
            }
            className="min-h-[38px] px-3 py-1.5 rounded-lg border border-[#CBD5D0] dark:border-[#324039] text-xs font-medium text-[#425049] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE] inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#EFF3F1] dark:divide-[#24302A]">
          {items.map((item) => {
            const val = splitSelections[item.id];
            return (
              <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] tabular-nums">{item.label}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSplitSelections((p) => ({ ...p, [item.id]: 'shop' }))}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      val === 'shop'
                        ? 'bg-[#047857] text-white'
                        : 'bg-[#EFF3F1] dark:bg-[#1C2521] text-[#425049] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                    }`}
                  >
                    Shop Cash Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setSplitSelections((p) => ({ ...p, [item.id]: 'home' }))}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      val === 'home'
                        ? 'bg-[#141A17] dark:bg-[#ECF2EE] text-white dark:text-[#141A17]'
                        : 'bg-[#EFF3F1] dark:bg-[#1C2521] text-[#425049] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                    }`}
                  >
                    Household Pouch
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {allChosen && (
            <p className={`text-sm font-medium ${allCorrect ? 'text-[#047857] dark:text-[#34D399]' : 'text-[#B45309] dark:text-[#FBBF24]'}`}>
              {allCorrect
                ? 'Correct — restocking & cart stays in Shop Cash; personal bills stay in Household.'
                : 'Check again: business stock & delivery belong in Shop Cash, personal needs in Household.'}
            </p>
          )}
          <button
            type="button"
            disabled={!allCorrect}
            onClick={onComplete}
            className="ml-auto min-h-[44px] px-5 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#065F46] transition-colors"
          >
            Confirm Cash Split
          </button>
        </div>
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'bookkeeping-ledger') {
    const checkLedger = () => {
      if (Number(ledgerAnswer.trim()) === 135) {
        setLedgerStatus('pass');
        onComplete();
      } else {
        setLedgerStatus('retry');
      }
    };

    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6">
        <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
          Practice: Close the Evening Cash Ledger
        </h3>
        <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
          Calculate the closing balance from today’s three-column tally.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse tabular-nums">
            <thead>
              <tr className="border-b border-[#E2E7E4] dark:border-[#28342E] text-xs font-semibold text-[#5A6760] dark:text-[#8FA398]">
                <th className="py-2 pr-4">Entry</th>
                <th className="py-2 pr-4 text-right">Money In</th>
                <th className="py-2 text-right">Money Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFF3F1] dark:divide-[#24302A]">
              <tr>
                <td className="py-2.5 pr-4 text-[#141A17] dark:text-[#ECF2EE]">Morning Vegetable Sales</td>
                <td className="py-2.5 pr-4 text-right font-mono text-[#047857] dark:text-[#34D399]">+120</td>
                <td className="py-2.5 text-right font-mono text-[#5A6760] dark:text-[#8FA398]">0</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-[#141A17] dark:text-[#ECF2EE]">Packing Bags & Ice</td>
                <td className="py-2.5 pr-4 text-right font-mono text-[#5A6760] dark:text-[#8FA398]">0</td>
                <td className="py-2.5 text-right font-mono text-[#B45309] dark:text-[#FBBF24]">-35</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-[#141A17] dark:text-[#ECF2EE]">Afternoon Grain Sales</td>
                <td className="py-2.5 pr-4 text-right font-mono text-[#047857] dark:text-[#34D399]">+50</td>
                <td className="py-2.5 text-right font-mono text-[#5A6760] dark:text-[#8FA398]">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="ledger-balance-input" className="text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] shrink-0">
            Closing Balance:
          </label>
          <input
            id="ledger-balance-input"
            type="number"
            value={ledgerAnswer}
            onChange={(e) => {
              setLedgerAnswer(e.target.value);
              setLedgerStatus('idle');
            }}
            placeholder="Enter total (e.g. 135)"
            className="min-h-[44px] w-full sm:w-48 px-3.5 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] font-mono text-sm text-[#141A17] dark:text-[#ECF2EE] focus:outline-none focus:border-[#047857]"
          />
          <button
            type="button"
            onClick={checkLedger}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] transition-colors shrink-0"
          >
            Check Balance
          </button>
        </div>

        {ledgerStatus === 'pass' && (
          <p className="mt-3 text-sm font-medium text-[#047857] dark:text-[#34D399]">
            Verified: 120 + 50 - 35 = 135 matches the physical cash box.
          </p>
        )}
        {ledgerStatus === 'retry' && (
          <p className="mt-3 text-sm font-medium text-[#B45309] dark:text-[#FBBF24]">
            Not quite — add Money In (120 + 50), then subtract Money Out (35).
          </p>
        )}
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'bookkeeping-profit') {
    const trueProfit = totalSales - wholesaleCost - transportCost;
    const profitPct = Math.max(0, Math.round((trueProfit / totalSales) * 100));
    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Practice: True Profit Margin Explorer
          </h3>
          <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
            Adjust wholesale and transport costs against $240 daily revenue to see real profit.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
              <label htmlFor="wholesale-slider">Wholesale Stock Cost</label>
              <span className="font-mono">${wholesaleCost}</span>
            </div>
            <input
              id="wholesale-slider"
              type="range"
              min={80}
              max={200}
              step={5}
              value={wholesaleCost}
              onChange={(e) => setWholesaleCost(Number(e.target.value))}
              className="w-full mt-2 accent-[#047857]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
              <label htmlFor="transport-slider">Transport & Bags</label>
              <span className="font-mono">${transportCost}</span>
            </div>
            <input
              id="transport-slider"
              type="range"
              min={5}
              max={50}
              step={5}
              value={transportCost}
              onChange={(e) => setTransportCost(Number(e.target.value))}
              className="w-full mt-2 accent-[#047857]"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F7F5] dark:bg-[#1C2521] border border-[#E2E7E4] dark:border-[#28342E] flex flex-wrap items-center justify-between gap-4 tabular-nums">
          <div>
            <p className="text-xs text-[#5A6760] dark:text-[#8FA398]">Total Sales</p>
            <p className="font-mono text-lg font-semibold text-[#141A17] dark:text-[#ECF2EE]">${totalSales}</p>
          </div>
          <div>
            <p className="text-xs text-[#5A6760] dark:text-[#8FA398]">True Profit</p>
            <p className={`font-mono text-lg font-semibold ${trueProfit > 0 ? 'text-[#047857] dark:text-[#34D399]' : 'text-[#DC2626] dark:text-[#F87171]'}`}>
              ${trueProfit} ({profitPct}%)
            </p>
          </div>
          <button
            type="button"
            onClick={onComplete}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] transition-colors"
          >
            Save Profit Calculation
          </button>
        </div>
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'farming-zai') {
    const retentionScore = Math.min(
      100,
      Math.round(((basinDepthCm >= 14 && basinDepthCm <= 20 ? 50 : 25) + mulchCoverPct * 0.5))
    );
    const optimal = basinDepthCm >= 14 && basinDepthCm <= 18 && mulchCoverPct >= 70;

    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Interactive Field Model: Zai Basin & Mulch Moisture
          </h3>
          <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
            Tune basin depth (target 15 cm) and dry grass mulch cover (target ≥ 70%) to maximize root moisture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
              <label htmlFor="basin-depth">Basin Depth (cm)</label>
              <span className="font-mono">{basinDepthCm} cm</span>
            </div>
            <input
              id="basin-depth"
              type="range"
              min={5}
              max={25}
              value={basinDepthCm}
              onChange={(e) => setBasinDepthCm(Number(e.target.value))}
              className="w-full mt-2 accent-[#047857]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-medium text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
              <label htmlFor="mulch-cover">Dry Grass Mulch Cover (%)</label>
              <span className="font-mono">{mulchCoverPct}%</span>
            </div>
            <input
              id="mulch-cover"
              type="range"
              min={0}
              max={100}
              step={10}
              value={mulchCoverPct}
              onChange={(e) => setMulchCoverPct(Number(e.target.value))}
              className="w-full mt-2 accent-[#047857]"
            />
          </div>
        </div>

        {/* Clean visual basin meter */}
        <div className="p-4 rounded-xl bg-[#F4F7F5] dark:bg-[#1C2521] border border-[#E2E7E4] dark:border-[#28342E] space-y-3">
          <div className="flex items-center justify-between text-sm tabular-nums">
            <span className="font-medium text-[#141A17] dark:text-[#ECF2EE]">Root Zone Moisture Retention</span>
            <span className={`font-mono font-semibold ${optimal ? 'text-[#047857] dark:text-[#34D399]' : 'text-[#B45309] dark:text-[#FBBF24]'}`}>
              {retentionScore}% · {optimal ? 'OPTIMAL' : 'ADJUST DEPTH / MULCH'}
            </span>
          </div>
          <div className="h-3 rounded-full bg-[#DCE4DF] dark:bg-[#24302A] overflow-hidden">
            <div
              className="h-full bg-[#047857] dark:bg-[#10B981] transition-all duration-200"
              style={{ width: `${retentionScore}%` }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              disabled={!optimal}
              onClick={onComplete}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#065F46] transition-colors"
            >
              Lock Optimal Zai Design
            </button>
          </div>
        </div>
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'farming-compost') {
    const ratioOk = brownBuckets === greenBuckets * 3;
    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Interactive Compost Mixer: Achieve the 3:1 Ratio
          </h3>
          <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
            Balance dry brown stalks and fresh green scraps so the pile cooks cleanly without odor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[#E2E7E4] dark:border-[#28342E] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#5A6760] dark:text-[#8FA398]">Dry Brown Leaves</p>
              <p className="font-mono text-xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">{brownBuckets} buckets</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBrownBuckets((v) => Math.max(1, v - 1))}
                className="w-10 h-10 rounded-lg border border-[#CBD5D0] dark:border-[#324039] text-lg font-semibold text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521]"
                aria-label="Decrease brown buckets"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setBrownBuckets((v) => Math.min(9, v + 1))}
                className="w-10 h-10 rounded-lg border border-[#CBD5D0] dark:border-[#324039] text-lg font-semibold text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521]"
                aria-label="Increase brown buckets"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#E2E7E4] dark:border-[#28342E] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#5A6760] dark:text-[#8FA398]">Fresh Green Scraps</p>
              <p className="font-mono text-xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">{greenBuckets} buckets</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGreenBuckets((v) => Math.max(1, v - 1))}
                className="w-10 h-10 rounded-lg border border-[#CBD5D0] dark:border-[#324039] text-lg font-semibold text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521]"
                aria-label="Decrease green buckets"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setGreenBuckets((v) => Math.min(3, v + 1))}
                className="w-10 h-10 rounded-lg border border-[#CBD5D0] dark:border-[#324039] text-lg font-semibold text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521]"
                aria-label="Increase green buckets"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`text-sm font-medium tabular-nums ${ratioOk ? 'text-[#047857] dark:text-[#34D399]' : 'text-[#B45309] dark:text-[#FBBF24]'}`}>
            Current Ratio: {brownBuckets}:{greenBuckets}{' '}
            {ratioOk ? '— Ideal 3:1 balance!' : '— Aim for 3 brown buckets per 1 green bucket'}
          </p>
          <button
            type="button"
            disabled={!ratioOk}
            onClick={onComplete}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#065F46]"
          >
            Confirm Compost Mix
          </button>
        </div>
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'farming-companion') {
    const validPlot = plotRow2 === 'beans' && plotBorder === 'marigold';
    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Practice: Build a Three-Partner Maize Plot
          </h3>
          <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
            Select the nitrogen-fixing intercrop beside Maize and the pest-repelling border plant.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-[#5A6760] dark:text-[#8FA398] mb-2">Row Beside Maize</p>
            <div className="flex flex-wrap gap-2">
              {(['maize', 'beans', 'stones'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPlotRow2(opt)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-semibold capitalize ${
                    plotRow2 === opt
                      ? 'bg-[#047857] text-white'
                      : 'bg-[#EFF3F1] dark:bg-[#1C2521] text-[#425049] dark:text-[#B5C4BC]'
                  }`}
                >
                  {opt === 'beans' ? 'Climbing Beans' : opt === 'maize' ? 'More Maize' : 'Bare Soil'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#5A6760] dark:text-[#8FA398] mb-2">Outer Field Border</p>
            <div className="flex flex-wrap gap-2">
              {(['bare', 'marigold'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPlotBorder(opt)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-semibold ${
                    plotBorder === opt
                      ? 'bg-[#047857] text-white'
                      : 'bg-[#EFF3F1] dark:bg-[#1C2521] text-[#425049] dark:text-[#B5C4BC]'
                  }`}
                >
                  {opt === 'marigold' ? 'Marigolds / Lemongrass' : 'Unplanted Border'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className={`text-sm font-medium ${validPlot ? 'text-[#047857] dark:text-[#34D399]' : 'text-[#5A6760] dark:text-[#8FA398]'}`}>
            {validPlot
              ? 'Nitrogen boost + natural pest barrier active!'
              : 'Pair Maize with Climbing Beans and a Marigold border.'}
          </p>
          <button
            type="button"
            disabled={!validPlot}
            onClick={onComplete}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold disabled:opacity-40"
          >
            Save Plot Plan
          </button>
        </div>
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'digital-scam') {
    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Practice: Respond to a Suspicious Agent Call
          </h3>
          <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
            Scenario: “Hello, I work for MobilePay. Your wallet is locked. Read me the 4-digit PIN and SMS code to unlock your account.”
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setScamAction('share')}
            className={`min-h-[48px] p-4 rounded-xl border text-left text-sm font-medium transition-colors ${
              scamAction === 'share'
                ? 'border-[#DC2626] bg-[#FEF2F2] dark:bg-[#450A0A]/50 text-[#991B1B] dark:text-[#FCA5A5]'
                : 'border-[#E2E7E4] dark:border-[#28342E] hover:bg-[#F7F9F8] dark:hover:bg-[#1C2521] text-[#141A17] dark:text-[#ECF2EE]'
            }`}
          >
            Read the SMS verification code so they unlock it quickly.
          </button>

          <button
            type="button"
            onClick={() => {
              setScamAction('hangup');
              onComplete();
            }}
            className={`min-h-[48px] p-4 rounded-xl border text-left text-sm font-medium transition-colors ${
              scamAction === 'hangup'
                ? 'border-[#047857] bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#065F46] dark:text-[#A7F3D0]'
                : 'border-[#E2E7E4] dark:border-[#28342E] hover:bg-[#F7F9F8] dark:hover:bg-[#1C2521] text-[#141A17] dark:text-[#ECF2EE]'
            }`}
          >
            Hang up immediately and check my official balance menu myself.
          </button>
        </div>

        {scamAction === 'share' && (
          <div className="flex items-center gap-2 text-sm font-medium text-[#B45309] dark:text-[#FBBF24]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Unsafe! Real agents never ask for PINs or SMS codes over the phone.</span>
          </div>
        )}
        {scamAction === 'hangup' && (
          <div className="flex items-center gap-2 text-sm font-medium text-[#047857] dark:text-[#34D399]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Safe choice — never share PINs or one-time codes with any caller.</span>
          </div>
        )}
        {renderCompletedBanner()}
      </div>
    );
  }

  if (kind === 'digital-receipt') {
    const allChecked =
      receiptChecks.ownPhone && receiptChecks.senderId && receiptChecks.newBalance;

    return (
      <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Practice: Three-Point Receipt Checklist
          </h3>
          <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
            A buyer shows you a phone screenshot saying “Paid $24”. Confirm all three checks before handing over goods.
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            { key: 'ownPhone' as const, label: 'Wait for the official SMS on MY OWN phone (never trust buyer screenshots)' },
            { key: 'senderId' as const, label: 'Verify official MobilePay sender ID and exact $24.00 amount' },
            { key: 'newBalance' as const, label: 'Confirm my wallet balance actually increased' },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E7E4] dark:border-[#28342E] cursor-pointer hover:bg-[#F7F9F8] dark:hover:bg-[#1C2521] min-h-[48px]"
            >
              <input
                type="checkbox"
                checked={receiptChecks[item.key]}
                onChange={(e) =>
                  setReceiptChecks((prev) => ({ ...prev, [item.key]: e.target.checked }))
                }
                className="w-5 h-5 accent-[#047857] shrink-0"
              />
              <span className="text-sm text-[#141A17] dark:text-[#ECF2EE]">{item.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={!allChecked}
            onClick={onComplete}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold disabled:opacity-40"
          >
            Approve Goods Release
          </button>
        </div>
        {renderCompletedBanner()}
      </div>
    );
  }

  // digital-datasaver
  const allSaved =
    dataSettings.dataSaver && dataSettings.autoVideoOff && dataSettings.wifiPacks;

  return (
    <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-4">
      <div>
        <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
          Practice: Configure Zero-Waste Offline Phone Habits
        </h3>
        <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5">
          Enable all three data-saving habits before heading to areas with weak cellular signal.
        </p>
      </div>

      <div className="space-y-2.5">
        {[
          { key: 'dataSaver' as const, label: 'Turn on Phone Data Saver mode' },
          { key: 'autoVideoOff' as const, label: 'Disable automatic video downloads on mobile data' },
          { key: 'wifiPacks' as const, label: 'Download spoken lesson packs on Wi-Fi' },
        ].map((item) => (
          <label
            key={item.key}
            className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#E2E7E4] dark:border-[#28342E] cursor-pointer hover:bg-[#F7F9F8] dark:hover:bg-[#1C2521] min-h-[48px]"
          >
            <span className="text-sm font-medium text-[#141A17] dark:text-[#ECF2EE]">{item.label}</span>
            <input
              type="checkbox"
              checked={dataSettings[item.key]}
              onChange={(e) =>
                setDataSettings((prev) => ({ ...prev, [item.key]: e.target.checked }))
              }
              className="w-5 h-5 accent-[#047857] shrink-0"
            />
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!allSaved}
          onClick={onComplete}
          className="min-h-[44px] px-5 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold disabled:opacity-40"
        >
          Confirm Offline Setup
        </button>
      </div>
      {renderCompletedBanner()}
    </div>
  );
};
