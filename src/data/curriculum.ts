import { LanguageMeta, SkillTrack, TrackId, Lesson } from '../types/curriculum';

export const LANGUAGES: LanguageMeta[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    bcp47: 'en-US',
    regionLabel: 'International',
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    bcp47: 'sw-KE',
    regionLabel: 'East Africa',
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    bcp47: 'yo-NG',
    regionLabel: 'West Africa',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    bcp47: 'es-MX',
    regionLabel: 'Latin America',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    bcp47: 'hi-IN',
    regionLabel: 'South Asia',
  },
];

export const UI_LABELS = {
  tracksNav: {
    en: 'Tracks',
    sw: 'Mafunzo',
    yo: 'Àwọn Ẹ̀kọ́',
    es: 'Cursos',
    hi: 'पाठ्यक्रम',
  },
  studioNav: {
    en: 'Lesson Studio',
    sw: 'Chumba cha Somo',
    yo: 'Yàrá Ẹ̀kọ́',
    es: 'Estudio',
    hi: 'अध्ययन कक्ष',
  },
  progressNav: {
    en: 'Progress',
    sw: 'Maendeleo',
    yo: 'Ìlọsíwájú',
    es: 'Progreso',
    hi: 'प्रगति',
  },
  offlineNav: {
    en: 'Offline Packs',
    sw: 'Hifadhi Nje ya Mtandao',
    yo: 'Ìfipamọ́ Àìlọ́rí-ẹ̀rọ',
    es: 'Sin Conexión',
    hi: 'ऑफ़लाइन पैक',
  },
} as const;

export const SKILL_TRACKS: SkillTrack[] = [
  {
    id: 'bookkeeping',
    title: {
      en: 'Bookkeeping & Cash Flow',
      sw: 'Uwekaji Hesabu na Mtiririko wa Fedha',
      yo: 'Ìṣírò Owó àti Ìṣàn Owó',
      es: 'Contabilidad y Flujo de Caja',
      hi: 'बहीखाता और नकदी प्रवाह',
    },
    subtitle: {
      en: 'Separate household cash from shop money, log daily tallies, and calculate true profit.',
      sw: 'Tenganisha fedha za nyumbani na za biashara, rekodi mauzo ya kila siku, na hesabu faida halisi.',
      yo: 'Ya owó ilé sọ́tọ̀ kúrò lọ́dọ̀ owó iṣẹ́, kọ títà ojoojúmọ́ sílẹ̀, kí o sì ṣírò èrè gidi.',
      es: 'Separa el dinero del hogar del negocio, registra ventas diarias y calcula la ganancia real.',
      hi: 'घर के खर्च को दुकान के पैसे से अलग रखें, रोज़ की बिक्री लिखें और असली मुनाफा निकालें।',
    },
    imageUrl: '/src/assets/images/track_bookkeeping_1795231030985.jpg',
    packSizeKb: 420,
    lessons: [
      {
        id: 'bk-1',
        trackId: 'bookkeeping',
        order: 1,
        durationMin: 4,
        title: {
          en: 'Separating Business & Household Cash',
          sw: 'Kutenganisha Fedha za Biashara na Nyumbani',
          yo: 'Yíya Owó Iṣẹ́ Sọ́tọ̀ sí Owó Ilé',
          es: 'Separar el Dinero del Negocio y del Hogar',
          hi: 'व्यापार और घर के पैसों को अलग रखना',
        },
        summary: {
          en: 'Learn why using two distinct cash envelopes protects your restocking capital.',
          sw: 'Jifunze kwa nini kutumia bahasha mbili tofauti kunalinda mtaji wako wa kuagiza bidhaa.',
          yo: 'Kọ́ bí lílo àpò owó méjì ọ̀tọ̀ọ̀tọ̀ ṣe ń dáàbò bo owó ìdókòwò rẹ.',
          es: 'Aprende por qué usar dos sobres distintos protege tu capital de reposición.',
          hi: 'जानें कि दो अलग बटुए रखने से दुकान का माल दोबारा खरीदने की पूंजी कैसे सुरक्षित रहती है।',
        },
        practiceKind: 'bookkeeping-split',
        segments: [
          {
            id: 'bk-1-s1',
            durationSec: 45,
            title: {
              en: 'Two-Drawer Rule',
              sw: 'Kanuni ya Droo Mbili',
              yo: 'Òfin Àpótí Méjì',
              es: 'Regla de los Dos Sobres',
              hi: 'दो बटुए का नियम',
            },
            content: {
              en: {
                spokenText: 'Keep shop sales in one box and family spending in a separate pouch. Never pay school fees or buy dinner directly out of the shop till before closing your daily count.',
                phoneticGuide: 'Keep shop sales in one box and fam-i-ly spend-ing in a sep-a-rate pouch.',
                keyTakeaway: 'Never mix personal spending directly into the shop cash box.',
              },
              sw: {
                spokenText: 'Weka mauzo ya duka katika sanduku moja na matumizi ya familia katika mfuko tofauti. Usilipe karo au kununua chakula moja kwa moja kutoka sanduku la duka kabla ya kufunga hesabu ya siku.',
                phoneticGuide: 'Weh-kah mah-oo-zoh yah doo-kah kah-tee-kah sahn-doo-koo moh-jah.',
                keyTakeaway: 'Tenganisha sanduku la mauzo na mfuko wa familia kila siku.',
              },
              yo: {
                spokenText: 'Fi owó títà ṣọ́ọ̀bù sínú àpótí kan, kí o sì fi ìnáwó ilé sínú àpò mìíràn. Má ṣe san owó ilé-ìwé tàbí ra oúnjẹ tààrà láti inú àpótí ṣọ́ọ̀bù kí o tó ka owó ọjọ́ náà.',
                phoneticGuide: 'Fee oh-woh tee-tah shop-boo see-noo ah-poh-tee kahn.',
                keyTakeaway: 'Ma ṣe da owó ṣọ́ọ̀bù àti owó ilé pọ̀.',
              },
              es: {
                spokenText: 'Guarda las ventas del puesto en una caja y los gastos del hogar en otro sobre. Nunca pagues comida ni gastos personales directo de la caja antes de hacer el cierre diario.',
                phoneticGuide: 'Gwar-da las ven-tas del pues-to en u-na ca-ja.',
                keyTakeaway: 'Usa una caja exclusiva para el negocio y otra para el hogar.',
              },
              hi: {
                spokenText: 'दुकान की बिक्री का पैसा एक डिब्बे में रखें और घर का खर्च अलग थैली में। दिन का हिसाब बंद करने से पहले दुकान के गल्ले से सीधे घर का राशन न खरीदें।',
                phoneticGuide: 'Dookaan kee bikree kaa paisaa ek dibbe mein rakhein.',
                keyTakeaway: 'दुकान के गल्ले और घर के बटुए को हमेशा अलग रखें।',
              },
            },
          },
          {
            id: 'bk-1-s2',
            durationSec: 40,
            title: {
              en: 'Paying Yourself a Fixed Wage',
              sw: 'Kujilipa Mshahara Maalum',
              yo: 'Sísan Owó Oṣù Fún Ara Rẹ',
              es: 'Págate un Sueldo Fijo',
              hi: 'खुद को तय वेतन देना',
            },
            content: {
              en: {
                spokenText: 'At the end of the week, count your profit and transfer a steady owner wage to your household pouch. Leave the rest to buy new stock.',
                phoneticGuide: 'Count your prof-it and trans-fer a stead-y own-er wage.',
                keyTakeaway: 'Pay yourself a fixed wage only after restocking costs are covered.',
              },
              sw: {
                spokenText: 'Mwishoni mwa wiki, hesabu faida yako na hamisha mshahara maalum kwenye mfuko wa nyumbani. Acha pesa iliyobaki kwa kununua bidhaa mpya.',
                phoneticGuide: 'Mwee-shoh-nee mwah wee-kee, heh-sah-boo fah-ee-dah.',
                keyTakeaway: 'Jilipe kiasi maalum baada ya kuweka akiba ya mtaji.',
              },
              yo: {
                spokenText: 'Ní òpin ọ̀sẹ̀, ka èrè rẹ kí o sì yọ owó iṣẹ́ tí ó dúró déédé sí àpò ilé. Fi ìyókù sílẹ̀ láti ra ọjà tuntun.',
                phoneticGuide: 'Nee oh-pin oh-seh, kah eh-reh reh.',
                keyTakeaway: 'San owó ọ̀sẹ̀ tí ó dúró fún ara rẹ láti inú èrè.',
              },
              es: {
                spokenText: 'Al final de la semana, cuenta tu ganancia y pasa un sueldo fijo al sobre de la casa. Deja el resto para reponer mercancía.',
                phoneticGuide: 'Al fi-nal de la se-ma-na, cuen-ta tu ga-nan-cia.',
                keyTakeaway: 'Asígnate un sueldo fijo semanal sin tocar el capital de compra.',
              },
              hi: {
                spokenText: 'सप्ताह के अंत में मुनाफा गिनें और घर के खर्च के लिए एक तय रकम निकालें। बाकी पैसा नया माल खरीदने के लिए छोड़ दें।',
                phoneticGuide: 'Saptaah ke ant mein munaafaa ginein.',
                keyTakeaway: 'माल खरीदने की पूंजी छोड़कर केवल मुनाफे से तय वेतन लें।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Say aloud why we keep shop cash and household cash separate.',
            sw: 'Sema kwa sauti kwa nini tunatenganisha fedha za duka na za nyumbani.',
            yo: 'Sọ sókè ìdí tí a fi ń ya owó ṣọ́ọ̀bù sọ́tọ̀ sí owó ilé.',
            es: 'Di en voz alta por qué separamos el dinero del negocio y del hogar.',
            hi: 'बोलकर बताएं कि हम दुकान और घर के पैसे अलग क्यों रखते हैं।',
          },
          expectedPhrase: {
            en: 'Keep shop cash separate from household money to protect restocking capital',
            sw: 'Tenganisha fedha za duka na nyumbani ili kulinda mtaji wa biashara',
            yo: 'Ya owó ṣọ́ọ̀bù sọ́tọ̀ sí owó ilé láti dáàbò bo owó ọjà',
            es: 'Separar el dinero del negocio y del hogar protege el capital',
            hi: 'दुकान और घर के पैसे अलग रखने से पूंजी सुरक्षित रहती है',
          },
          phoneticHint: {
            en: 'Include the words: separate, shop, household, capital',
            sw: 'Tumia maneno: tenganisha, duka, nyumbani, mtaji',
            yo: 'Lo àwọn ọ̀rọ̀: sọ́tọ̀, ṣọ́ọ̀bù, ilé, ọjà',
            es: 'Incluye las palabras: separar, negocio, hogar, capital',
            hi: 'ये शब्द बोलें: दुकान, घर, अलग, पूंजी',
          },
          keywords: {
            en: ['separate', 'shop', 'household', 'capital'],
            sw: ['tenganisha', 'duka', 'nyumbani', 'mtaji'],
            yo: ['sọ́tọ̀', 'ṣọ́ọ̀bù', 'ilé', 'ọjà'],
            es: ['separar', 'negocio', 'hogar', 'capital'],
            hi: ['दुकान', 'घर', 'अलग', 'पूंजी'],
          },
        },
      },
      {
        id: 'bk-2',
        trackId: 'bookkeeping',
        order: 2,
        durationMin: 5,
        title: {
          en: 'Daily Sales & Expense Tally',
          sw: 'Orodha ya Mauzo na Matumizi ya Kila Siku',
          yo: 'Àkọsílẹ̀ Títà àti Ìnáwó Ojoojúmọ́',
          es: 'Registro Diario de Ventas y Gastos',
          hi: 'दैनिक बिक्री और खर्च का हिसाब',
        },
        summary: {
          en: 'Record every sale and purchase in three clear columns before closing each evening.',
          sw: 'Andika kila mauzo na manunuzi katika safu tatu wazi kabla ya kufunga duka jioni.',
          yo: 'Kọ gbogbo títà àti rírà sí àwọn ọ̀wọ̀n mẹ́ta kí o tó ti ṣọ́ọ̀bù lálẹ́.',
          es: 'Anota cada venta y compra en tres columnas claras antes de cerrar cada tarde.',
          hi: 'शाम को दुकान बंद करने से पहले हर बिक्री और खर्च को तीन कॉलम में लिखें।',
        },
        practiceKind: 'bookkeeping-ledger',
        segments: [
          {
            id: 'bk-2-s1',
            durationSec: 50,
            title: {
              en: 'Three-Column Ledger',
              sw: 'Daftari la Safu Tatu',
              yo: 'Ìwé Ìṣírò Ọ̀wọ̀n Mẹ́ta',
              es: 'Libro de Tres Columnas',
              hi: 'तीन कॉलम वाला खाता',
            },
            content: {
              en: {
                spokenText: 'Draw three columns in your notebook: Money In, Money Out, and Balance. Write each sale right when cash changes hands so small amounts are never forgotten.',
                phoneticGuide: 'Draw three col-umns: Mon-ey In, Mon-ey Out, and Bal-ance.',
                keyTakeaway: 'Write every Money In and Money Out entry immediately.',
              },
              sw: {
                spokenText: 'Chora safu tatu kwenye daftari lako: Fedha Zilizopokelewa, Fedha Zilizotumika, na Salio. Andika kila mauzo mara moja ili kiasi kidogo kisisahaulike.',
                phoneticGuide: 'Choh-rah sah-foo tah-too kweh-nyeh dahf-tah-ree.',
                keyTakeaway: 'Andika mapato, matumizi, na salio papo hapo.',
              },
              yo: {
                spokenText: 'Fa ìlà mẹ́ta sínú ìwé rẹ: Owó Tí Ó Wọlé, Owó Tí Ó Jáde, àti Àṣẹ́kù. Kọ títà kọ̀ọ̀kan sílẹ̀ lẹ́sẹ̀kẹsẹ̀ kí owó kékeré má baà sọnù.',
                phoneticGuide: 'Fah ee-lah meh-tah see-noo ee-weh reh.',
                keyTakeaway: 'Kọ owó wọlé, owó jáde, àti àṣẹ́kù lójú ẹsẹ̀.',
              },
              es: {
                spokenText: 'Traza tres columnas en tu cuaderno: Entradas, Salidas y Saldo. Anota cada venta en el momento para no olvidar los montos pequeños.',
                phoneticGuide: 'Tra-za tres co-lum-nas: En-tra-das, Sa-li-das y Sal-do.',
                keyTakeaway: 'Registra entradas, salidas y saldo en el momento.',
              },
              hi: {
                spokenText: 'अपनी कॉपी में तीन कॉलम बनाएं: आया पैसा, गया पैसा, और बाकी। हर बिक्री तुरंत लिखें ताकि छोटी रकम भी न छूटे।',
                phoneticGuide: 'Apnee kopee mein teen kolam banaayein: aayaa, gayaa, baakee.',
                keyTakeaway: 'हर लेनदेन तुरंत तीन कॉलम में दर्ज करें।',
              },
            },
          },
          {
            id: 'bk-2-s2',
            durationSec: 45,
            title: {
              en: 'Evening Cash Check',
              sw: 'Ukaguzi wa Fedha Jioni',
              yo: 'Àyẹ̀wò Owó Lálẹ́',
              es: 'Cierre de Caja Nocturno',
              hi: 'शाम का नकदी मिलान',
            },
            content: {
              en: {
                spokenText: 'At sunset, subtract Money Out from Money In. Count the physical notes in your cash box and confirm both numbers match.',
                phoneticGuide: 'Sub-tract Mon-ey Out from Mon-ey In and match the cash box.',
                keyTakeaway: 'Always match your notebook balance with the real cash in your box.',
              },
              sw: {
                spokenText: 'Jioni, toa Fedha Zilizotumika kutoka Fedha Zilizopokelewa. Hesabu noti halisi kwenye sanduku na hakikisha namba zote mbili zinalingana.',
                phoneticGuide: 'Jee-oh-nee, toh-ah feh-dhah zee-lee-zoh-too-mee-kah.',
                keyTakeaway: 'Linganisha salio la daftari na fedha halisi.',
              },
              yo: {
                spokenText: 'Ní ìrọ̀lẹ́, yọ Owó Jáde kúrò nínú Owó Wọlé. Ka owó gidi nínú àpótí rẹ kí o rí i pé àwọn nọ́ńbà méjèèjì bá ara wọn mu.',
                phoneticGuide: 'Nee ee-roh-leh, yoh oh-woh jah-deh koo-roh.',
                keyTakeaway: 'Mú kí àṣẹ́kù ìwé àti owó gidi bá ara wọn mu.',
              },
              es: {
                spokenText: 'Al cerrar, resta las Salidas de las Entradas. Cuenta el efectivo real en tu caja y confirma que ambos números coincidan.',
                phoneticGuide: 'Res-ta las Sa-li-das de las En-tra-das y cuen-ta el e-fec-ti-vo.',
                keyTakeaway: 'El saldo escrito debe coincidir con el efectivo en caja.',
              },
              hi: {
                spokenText: 'शाम को आए पैसे में से गए पैसे घटाएं। गल्ले में रखे असली नोट गिनें और पक्का करें कि दोनों संख्याएं बराबर हैं।',
                phoneticGuide: 'Shaam ko aaye paise mein se gaye paise ghataayein.',
                keyTakeaway: 'कॉपी का हिसाब और गल्ले की नकदी हमेशा मिलनी चाहिए।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'State the three columns of a daily ledger and how you check the cash box.',
            sw: 'Taja safu tatu za daftari na jinsi unavyokagua sanduku la fedha.',
            yo: 'Dárúkọ ọ̀wọ̀n mẹ́ta ìwé ìṣírò àti bí o ṣe ń yẹ àpótí owó wò.',
            es: 'Nombra las tres columnas del registro y cómo verificas la caja.',
            hi: 'खाते के तीन कॉलम और शाम के मिलान का तरीका बोलकर बताएं।',
          },
          expectedPhrase: {
            en: 'Write money in, money out, and balance then match with physical cash',
            sw: 'Andika mapato, matumizi, na salio kisha linganisha na fedha halisi',
            yo: 'Kọ owó wọlé, owó jáde, àti àṣẹ́kù kí o sì fi wé owó gidi',
            es: 'Anota entradas, salidas y saldo y compara con el efectivo real',
            hi: 'आया पैसा, गया पैसा और बाकी लिखकर असली नकदी से मिलाएं',
          },
          phoneticHint: {
            en: 'Include: money in, money out, balance, match',
            sw: 'Tumia: mapato, matumizi, salio, linganisha',
            yo: 'Lo: wọlé, jáde, àṣẹ́kù, gidi',
            es: 'Incluye: entradas, salidas, saldo, efectivo',
            hi: 'बोलें: आया, गया, बाकी, नकदी',
          },
          keywords: {
            en: ['money', 'out', 'balance', 'cash'],
            sw: ['mapato', 'matumizi', 'salio', 'fedha'],
            yo: ['owó', 'wọlé', 'jáde', 'àṣẹ́kù'],
            es: ['entradas', 'salidas', 'saldo', 'efectivo'],
            hi: ['आया', 'गया', 'बाकी', 'नकदी'],
          },
        },
      },
      {
        id: 'bk-3',
        trackId: 'bookkeeping',
        order: 3,
        durationMin: 4,
        title: {
          en: 'Calculating True Profit & Reinvestment',
          sw: 'Kuhesabu Faida Halisi na Uwekezaji Tena',
          yo: 'Ṣíṣírò Èrè Gidi àti Àtún-dókòwò',
          es: 'Calcular la Ganancia Real y Reinvertir',
          hi: 'असली मुनाफा निकालना और पुनर्निवेश',
        },
        summary: {
          en: 'Distinguish total revenue from true profit after subtracting cost of goods and transport.',
          sw: 'Tofautisha mapato yote na faida halisi baada ya kutoa gharama ya bidhaa na usafiri.',
          yo: 'Mọ ìyàtọ̀ láàrin gbogbo owó tí o rí àti èrè gidi lẹ́yìn ìnáwó ọjà àti ọkọ̀.',
          es: 'Distingue el ingreso total de la ganancia real tras restar costo y transporte.',
          hi: 'सामान की लागत और किराया घटाने के बाद कुल बिक्री और असली मुनाफे का अंतर समझें।',
        },
        practiceKind: 'bookkeeping-profit',
        segments: [
          {
            id: 'bk-3-s1',
            durationSec: 45,
            title: {
              en: 'Revenue vs. Profit',
              sw: 'Mapato dhidi ya Faida',
              yo: 'Owó Títà àti Èrè Gidi',
              es: 'Ingreso frente a Ganancia',
              hi: 'कुल बिक्री बनाम मुनाफा',
            },
            content: {
              en: {
                spokenText: 'Total cash received is not profit. Subtract what you paid the wholesaler, transport fare, and packaging bags first. Only the remainder is true profit.',
                phoneticGuide: 'To-tal cash re-ceived is not prof-it. Sub-tract whole-sale and trans-port.',
                keyTakeaway: 'True Profit = Total Sales minus Wholesale Cost minus Transport.',
              },
              sw: {
                spokenText: 'Pesa yote unayopokea si faida. Kwanza toa gharama ya jumla ya bidhaa, nauli ya usafiri, na mifuko. Kinachobaki ndicho faida halisi.',
                phoneticGuide: 'Peh-sah yoh-teh oo-nah-yoh-poh-keh-ah see fah-ee-dah.',
                keyTakeaway: 'Faida halisi ni mauzo ukitoa gharama za bidhaa na usafiri.',
              },
              yo: {
                spokenText: 'Gbogbo owó tí o gbà kì í ṣe èrè. Yọ owó tí o fi ra ọjà, owó ọkọ̀, àti àpò ìdìpọ̀ kúrò ní àkọ́kọ́. Ìyókù nìkan ni èrè gidi.',
                phoneticGuide: 'Gbo-gbo oh-woh tee oh gbah kee sheh eh-reh.',
                keyTakeaway: 'Èrè gidi ni títà tí a yọ owó ọjà àti ọkọ̀ kúrò.',
              },
              es: {
                spokenText: 'Todo el dinero que entra no es ganancia. Resta primero lo que pagaste al mayorista, el transporte y las bolsas. Solo lo que queda es ganancia real.',
                phoneticGuide: 'To-do el di-ne-ro que en-tra no es ga-nan-cia.',
                keyTakeaway: 'Ganancia real = Ventas totales menos costo de compra y transporte.',
              },
              hi: {
                spokenText: 'दुकान में आया सारा पैसा मुनाफा नहीं है। पहले थोक माल की कीमत, किराया और पैकिंग का खर्च घटाएं। जो बचे वही असली मुनाफा है।',
                phoneticGuide: 'Dookaan mein aayaa saaraa paisaa munaafaa naheen hai.',
                keyTakeaway: 'असली मुनाफा = कुल बिक्री घटाव माल की लागत और भाड़ा।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Explain how to calculate true profit from your daily sales.',
            sw: 'Eleza jinsi ya kuhesabu faida halisi kutoka kwa mauzo yako.',
            yo: 'Ṣàlàyé bí a ṣe ń ṣírò èrè gidi láti inú títà rẹ.',
            es: 'Explica cómo calcular la ganancia real a partir de tus ventas.',
            hi: 'बताएं कि कुल बिक्री से असली मुनाफा कैसे निकाला जाता है।',
          },
          expectedPhrase: {
            en: 'Subtract wholesale cost and transport from total sales to find true profit',
            sw: 'Toa gharama ya bidhaa na usafiri kutoka mauzo ili kupata faida halisi',
            yo: 'Yọ owó ọjà àti ọkọ̀ kúrò nínú títà láti rí èrè gidi',
            es: 'Resta el costo de compra y el transporte a las ventas para hallar la ganancia',
            hi: 'कुल बिक्री से माल की लागत और किराया घटाकर असली मुनाफा निकालें',
          },
          phoneticHint: {
            en: 'Include: subtract, cost, transport, profit',
            sw: 'Tumia: toa, gharama, usafiri, faida',
            yo: 'Lo: yọ, owó ọjà, ọkọ̀, èrè',
            es: 'Incluye: resta, costo, transporte, ganancia',
            hi: 'बोलें: बिक्री, लागत, किराया, मुनाफा',
          },
          keywords: {
            en: ['subtract', 'cost', 'transport', 'profit'],
            sw: ['toa', 'gharama', 'usafiri', 'faida'],
            yo: ['yọ', 'ọjà', 'ọkọ̀', 'èrè'],
            es: ['resta', 'costo', 'transporte', 'ganancia'],
            hi: ['बिक्री', 'लागत', 'किराया', 'मुनाफा'],
          },
        },
      },
    ],
  },
  {
    id: 'farming',
    title: {
      en: 'Sustainable Farming Techniques',
      sw: 'Mbinu za Kilimo Endelevu',
      yo: 'Ọ̀nà Àgbẹ̀ Tí Ó Lẹ́mìí Gígùn',
      es: 'Técnicas de Agricultura Sostenible',
      hi: 'टिकाऊ खेती के तरीके',
    },
    subtitle: {
      en: 'Capture rainwater in Zai basins, build rich compost layers, and protect crops naturally.',
      sw: 'Hifadhi maji ya mvua kwenye mashimo ya Zai, tengeneza mboji bora, na linda mazao kwa njia za asili.',
      yo: 'Pa omi òjò mọ́ sínú kòtò Zai, ṣe àkópọ̀ ilẹ̀ olóore, kí o sì dáàbò bo irúgbìn láìlo kẹ́míkà líle.',
      es: 'Capta agua de lluvia en hoyos Zai, prepara abono orgánico y protege cultivos naturalmente.',
      hi: 'ज़ाई गड्ढों से बारिश का पानी बचाएं, जैविक खाद बनाएं और प्राकृतिक तरीकों से फसल की रक्षा करें।',
    },
    imageUrl: '/src/assets/images/track_farming_1795231031289.jpg',
    packSizeKb: 485,
    lessons: [
      {
        id: 'fm-1',
        trackId: 'farming',
        order: 1,
        durationMin: 5,
        title: {
          en: 'Moisture-Saving Zai Pits & Mulching',
          sw: 'Mashimo ya Zai na Matandazo ya Kuhifadhi Unyevu',
          yo: 'Kòtò Zai àti Ìbòjú Ilẹ̀ Tí Ó Ń Pa Ọ̀rinrin Mọ́',
          es: 'Hoyos Zai y Acolchado para Retener Humedad',
          hi: 'नमी बचाने वाले ज़ाई गड्ढे और पलवार',
        },
        summary: {
          en: 'Dig shallow planting basins and cover soil with dry grass to double water retention.',
          sw: 'Chimba mashimo mafupi ya kupandia na funika udongo kwa nyasi kavu ili kuhifadhi maji mara mbili.',
          yo: 'Wa kòtò rírẹ̀lẹ̀ fún gbígbin kí o sì fi koríko gbígbẹ bo ilẹ̀ láti pa omi mọ́.',
          es: 'Cava pequeños hoyos de siembra y cubre el suelo con paja seca para retener agua.',
          hi: 'कम गहरे गड्ढे खोदें और सूखी घास से मिट्टी ढकें ताकि खेत में दोगुनी नमी टिकी रहे।',
        },
        practiceKind: 'farming-zai',
        segments: [
          {
            id: 'fm-1-s1',
            durationSec: 50,
            title: {
              en: 'Digging the Zai Basin',
              sw: 'Kuchimba Shimo la Zai',
              yo: 'Wíwa Kòtò Zai',
              es: 'Cómo Cavar el Hoyo Zai',
              hi: 'ज़ाई गड्ढा तैयार करना',
            },
            content: {
              en: {
                spokenText: 'Dig basins 30 centimeters wide and 15 centimeters deep before the rains arrive. Place a handful of compost at the bottom and spread dry grass mulch around the rim.',
                phoneticGuide: 'Dig ba-sins thir-ty cen-ti-me-ters wide and fif-teen deep.',
                keyTakeaway: '30cm wide by 15cm deep basins catch runoff right at the roots.',
              },
              sw: {
                spokenText: 'Chimba mashimo yenye upana wa sentimita 30 na kina cha sentimita 15 kabla ya mvua kunyesha. Weka mboji kidogo chini na tandaza nyasi kavu pembeni.',
                phoneticGuide: 'Cheem-bah mah-shee-moh yeh-nyeh oo-pah-nah wah sen-tee-mee-tah.',
                keyTakeaway: 'Mashimo ya sentimita 30 kwa 15 hukamata maji ya mvua karibu na mizizi.',
              },
              yo: {
                spokenText: 'Wa kòtò tí ó fẹ̀ ní sẹ̀ǹtímítà 30 tí ó sì jìn ní sẹ̀ǹtímítà 15 kí òjò tó bẹ̀rẹ̀. Fi àkópọ̀ ilẹ̀ díẹ̀ sísàlẹ̀ kí o sì fi koríko gbígbẹ bo etí rẹ̀.',
                phoneticGuide: 'Wah koh-toh tee oh feh nee sen-tee-mee-tah og-bon.',
                keyTakeaway: 'Kòtò sẹ̀ǹtímítà 30 ní ìbú máa ń gba omi òjò sẹ́bàá gbòǹgbò.',
              },
              es: {
                spokenText: 'Cava hoyos de 30 centímetros de ancho y 15 de profundidad antes de las lluvias. Pon un puñado de abono en el fondo y cubre alrededor con paja seca.',
                phoneticGuide: 'Ca-va ho-yos de trein-ta cen-tí-me-tros de an-cho.',
                keyTakeaway: 'Hoyos de 30x15 cm concentran el agua de lluvia en las raíces.',
              },
              hi: {
                spokenText: 'बारिश से पहले 30 सेंटीमीटर चौड़े और 15 सेंटीमीटर गहरे गड्ढे खोदें। नीचे थोड़ी गोबर खाद डालें और चारों ओर सूखी घास की परत बिछाएं।',
                phoneticGuide: 'Baarish se pehle tees senteemeeTar chaude gaddhe khodein.',
                keyTakeaway: '30x15 सेमी गड्ढे और सूखी घास से पानी सीधे जड़ों में रुकता है।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Describe how Zai basins and dry mulch help crops survive dry spells.',
            sw: 'Eleza jinsi mashimo ya Zai na nyasi kavu yanavyosaidia mazao wakati wa ukame.',
            yo: 'Ṣàlàyé bí kòtò Zai àti koríko gbígbẹ ṣe ń ran irúgbìn lọ́wọ́ nígbà ọ̀dá.',
            es: 'Describe cómo los hoyos Zai y la paja ayudan a los cultivos en sequía.',
            hi: 'बताएं कि ज़ाई गड्ढे और सूखी घास सूखे में फसल को कैसे बचाते हैं।',
          },
          expectedPhrase: {
            en: 'Zai basins capture rainwater and dry mulch keeps soil moisture near the roots',
            sw: 'Mashimo ya Zai yanahifadhi maji ya mvua na nyasi kavu zinatunza unyevu',
            yo: 'Kòtò Zai ń pa omi òjò mọ́, koríko gbígbẹ sì ń dáàbò bo ọ̀rinrin ilẹ̀',
            es: 'Los hoyos Zai captan lluvia y la paja mantiene la humedad en las raíces',
            hi: 'ज़ाई गड्ढे बारिश का पानी रोकते हैं और सूखी घास मिट्टी की नमी बचाती है',
          },
          phoneticHint: {
            en: 'Include: basin, rainwater, mulch, moisture',
            sw: 'Tumia: mashimo, maji, nyasi, unyevu',
            yo: 'Lo: kòtò, omi, koríko, ọ̀rinrin',
            es: 'Incluye: hoyos, lluvia, paja, humedad',
            hi: 'बोलें: गड्ढे, बारिश, घास, नमी',
          },
          keywords: {
            en: ['zai', 'rainwater', 'mulch', 'moisture'],
            sw: ['mashimo', 'maji', 'nyasi', 'unyevu'],
            yo: ['kòtò', 'omi', 'koríko', 'ọ̀rinrin'],
            es: ['hoyos', 'lluvia', 'paja', 'humedad'],
            hi: ['गड्ढे', 'बारिश', 'घास', 'नमी'],
          },
        },
      },
      {
        id: 'fm-2',
        trackId: 'farming',
        order: 2,
        durationMin: 4,
        title: {
          en: 'Composting & Natural Soil Fertility',
          sw: 'Kutengeneza Mboji na Rutuba ya Udongo',
          yo: 'Ṣíṣe Àkópọ̀ Ilẹ̀ Olóore',
          es: 'Abono Orgánico y Fertilidad del Suelo',
          hi: 'जैविक खाद बनाना और मिट्टी की उर्वरता',
        },
        summary: {
          en: 'Balance dry brown stalks and fresh green scraps to cook dark, odor-free compost.',
          sw: 'Sawazisha majani makavu na mabaki mabichi ya kijani ili kupata mboji bora isiyo na harufu.',
          yo: 'Dàpọ̀ ewé gbígbẹ àti ewé tútù déédé láti rí àkópọ̀ ilẹ̀ dúdú tí kò ní òórùn.',
          es: 'Equilibra restos secos marrones y verdes frescos para lograr abono sin mal olor.',
          hi: 'सूखे भूरे पत्तों और हरे कचरे को सही अनुपात में मिलाकर बिना बदबू वाली काली खाद बनाएं।',
        },
        practiceKind: 'farming-compost',
        segments: [
          {
            id: 'fm-2-s1',
            durationSec: 45,
            title: {
              en: 'Three Browns to One Green',
              sw: 'Sehemu Tatu Kavu kwa Moja Mbichi',
              yo: 'Ìpín Mẹ́ta Gbígbẹ sí Ọ̀kan Tútù',
              es: 'Tres Partes Secas por Una Verde',
              hi: 'तीन हिस्से सूखा और एक हिस्सा हरा',
            },
            content: {
              en: {
                spokenText: 'Layer three buckets of dry brown leaves or maize stalks for every one bucket of fresh green kitchen scraps or manure. Keep the pile as damp as a wrung-out sponge and turn it every ten days.',
                phoneticGuide: 'Three buck-ets of dry brown leaves for one buck-et of green scraps.',
                keyTakeaway: 'A 3:1 Brown-to-Green ratio prevents odor and speeds decomposition.',
              },
              sw: {
                spokenText: 'Weka ndoo tatu za majani makavu kwa kila ndoo moja ya mabaki mabichi ya kijani au samadi. Weka unyevu wa wastani na geuza lundo kila baada ya siku kumi.',
                phoneticGuide: 'Weh-kah ndoh-oh tah-too zah mah-jah-nee mah-kah-voo.',
                keyTakeaway: 'Uwiano wa 3 kwa 1 unaleta joto zuri na kuoza haraka.',
              },
              yo: {
                spokenText: 'Fi garawa mẹ́ta ewé gbígbẹ sí garawa kan ewé tútù tàbí ìgbẹ́ ẹran. Jẹ́ kí ó tutù díẹ̀ kí o sì máa yí i padà ní gbogbo ọjọ́ mẹ́wàá.',
                phoneticGuide: 'Fee gah-rah-wah meh-tah eh-weh gbee-gbeh.',
                keyTakeaway: 'Ìpín mẹ́ta gbígbẹ sí ọ̀kan tútù kò ní jẹ́ kí ó rùn.',
              },
              es: {
                spokenText: 'Coloca tres cubetas de hojas secas o rastrojo por cada cubeta de restos verdes frescos o estiércol. Mantén la pila húmeda como esponja exprimida y voltéala cada diez días.',
                phoneticGuide: 'Tres cu-be-tas de ho-jas se-cas por u-na de res-tos ver-des.',
                keyTakeaway: 'La proporción 3 a 1 evita malos olores y acelera el abono.',
              },
              hi: {
                spokenText: 'हर एक बाल्टी हरे कचरे या ताज़ा गोबर के साथ तीन बाल्टी सूखे पत्ते या भूसा मिलाएं। ढेर को हल्का नम रखें और हर दस दिन में पलटें।',
                phoneticGuide: 'Har ek baalTee hare kachre ke saath teen baalTee sookhe patte.',
                keyTakeaway: '3:1 सूखे और हरे कचरे का अनुपात खाद को जल्दी और साफ पकाता है।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Recite the compost ratio and how often to turn the pile.',
            sw: 'Taja uwiano wa mboji na mara ngapi ya kugeuza lundo.',
            yo: 'Sọ ìpín àkópọ̀ ilẹ̀ àti ìgbà tí a ń yí i padà.',
            es: 'Di la proporción del abono y cada cuánto voltear la pila.',
            hi: 'खाद बनाने का अनुपात और ढेर पलटने का समय बताएं।',
          },
          expectedPhrase: {
            en: 'Mix three parts dry brown leaves with one part green scraps and turn every ten days',
            sw: 'Changanya sehemu tatu za majani makavu na moja mbichi kisha geuza kila siku kumi',
            yo: 'Da garawa mẹ́ta gbígbẹ pọ̀ mọ́ ọ̀kan tútù kí o sì yí i ní ọjọ́ mẹ́wàá',
            es: 'Mezcla tres partes secas con una verde y voltea cada diez días',
            hi: 'तीन हिस्से सूखे पत्ते और एक हिस्सा हरा कचरा मिलाकर हर दस दिन में पलटें',
          },
          phoneticHint: {
            en: 'Include: three, dry, green, turn',
            sw: 'Tumia: tatu, makavu, mbichi, geuza',
            yo: 'Lo: mẹ́ta, gbígbẹ, tútù, yí',
            es: 'Incluye: tres, secas, verde, voltea',
            hi: 'बोलें: तीन, सूखे, हरा, पलटें',
          },
          keywords: {
            en: ['three', 'dry', 'green', 'turn'],
            sw: ['tatu', 'makavu', 'mbichi', 'geuza'],
            yo: ['mẹ́ta', 'gbígbẹ', 'tútù', 'yí'],
            es: ['tres', 'secas', 'verde', 'voltea'],
            hi: ['तीन', 'सूखे', 'हरा', 'पलटें'],
          },
        },
      },
      {
        id: 'fm-3',
        trackId: 'farming',
        order: 3,
        durationMin: 4,
        title: {
          en: 'Companion Planting & Pest Defense',
          sw: 'Kilimo Mseto na Kuzuia Wadudu',
          yo: 'Gbígbin Irúgbìn Alábàápín àti Ìdáàbòbò Kòkòrò',
          es: 'Cultivos Asociados y Control Natural de Plagas',
          hi: 'सह-फसल खेती और प्राकृतिक कीट नियंत्रण',
        },
        summary: {
          en: 'Pair maize, beans, and marigold borders to feed nitrogen and repel pests naturally.',
          sw: 'Changanya mahindi, maharagwe, na maua ya marigold ili kuongeza rutuba na kufukuza wadudu.',
          yo: 'Gbin àgbàdo, ẹ̀wà, àti òdòdó marigold pọ̀ láti mú ilẹ̀ lágbára kí ó sì lé kòkòrò jìnnà.',
          es: 'Asocia maíz, frijol y cempasúchil para fijar nitrógeno y repeler plagas.',
          hi: 'मक्का, फलियां और गेंदा साथ उगाकर मिट्टी में नाइट्रोजन बढ़ाएं और कीड़ों को दूर रखें।',
        },
        practiceKind: 'farming-companion',
        segments: [
          {
            id: 'fm-3-s1',
            durationSec: 45,
            title: {
              en: 'Three-Partner Plot',
              sw: 'Shamba la Mazao Matatu',
              yo: 'Oko Alábàápín Mẹ́ta',
              es: 'Parcela de Tres Aliados',
              hi: 'तीन फसलों की जोड़ी',
            },
            content: {
              en: {
                spokenText: 'Plant climbing beans beside maize stalks so beans feed nitrogen into the soil. Border the field with strong-scented marigolds or lemongrass to confuse stem-borer insects.',
                phoneticGuide: 'Beans feed ni-tro-gen; mar-i-golds re-pel stem bor-ers.',
                keyTakeaway: 'Legumes add nitrogen while aromatic border plants push pests away.',
              },
              sw: {
                spokenText: 'Panda maharagwe karibu na mahindi ili yaongeze naitrojeni ardhini. Weka maua ya marigold au mchaichai pembezoni ili kufukuza wadudu waharibifu.',
                phoneticGuide: 'Pahn-dah mah-hah-rah-gweh kah-ree-boo nah mah-heen-dee.',
                keyTakeaway: 'Maharagwe huongeza rutuba na mimea yenye harufu hufukuza wadudu.',
              },
              yo: {
                spokenText: 'Gbin ẹ̀wà sẹ́bàá àgbàdo kí ẹ̀wà lè fi èròjà nitrogen sínú ilẹ̀. Fi òdòdó marigold tàbí koríko tí ó ní òórùn sẹ́bàá oko láti lé kòkòrò jìnnà.',
                phoneticGuide: 'Gbeen eh-wah seh-bah ah-gbah-doh.',
                keyTakeaway: 'Ẹ̀wà ń mú ilẹ̀ lọ́ràá, òdòdó olóòórùn sì ń lé kòkòrò.',
              },
              es: {
                spokenText: 'Siembra frijol junto al maíz para aportar nitrógeno al suelo. Rodea la parcela con cempasúchil o zacate limón para ahuyentar insectos dañinos.',
                phoneticGuide: 'Siem-bra fri-jol jun-to al ma-íz pa-ra a-por-tar ni-tró-ge-no.',
                keyTakeaway: 'Las leguminosas nutren el suelo y las flores aromáticas repelen plagas.',
              },
              hi: {
                spokenText: 'मक्का के पास फलियां उगाएं ताकि जड़ों को प्राकृतिक नाइट्रोजन मिले। खेत की मेड़ पर गेंदा या लेमनग्रास लगाएं जिससे कीट फसल से दूर रहें।',
                phoneticGuide: 'Makkaa ke paas phaliyaan ugaayein aur med par gendaa.',
                keyTakeaway: 'फलियां मिट्टी को ताकत देती हैं और गेंदा कीड़ों को भगाता है।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Explain what beans and marigold borders each do for a maize plot.',
            sw: 'Eleza kazi ya maharagwe na maua ya marigold katika shamba la mahindi.',
            yo: 'Ṣàlàyé iṣẹ́ tí ẹ̀wà àti òdòdó marigold ń ṣe ní oko àgbàdo.',
            es: 'Explica qué aportan el frijol y el cempasúchil al cultivo de maíz.',
            hi: 'बताएं कि मक्का के खेत में फलियां और गेंदा क्या काम करते हैं।',
          },
          expectedPhrase: {
            en: 'Beans add nitrogen to the soil and marigolds repel harmful insects',
            sw: 'Maharagwe huongeza rutuba ardhini na marigold hufukuza wadudu waharibifu',
            yo: 'Ẹ̀wà ń fi èròjà sínú ilẹ̀, marigold sì ń lé kòkòrò búburú jìnnà',
            es: 'El frijol aporta nitrógeno al suelo y el cempasúchil repele insectos',
            hi: 'फलियां मिट्टी में नाइट्रोजन बढ़ाती हैं और गेंदा कीड़ों को दूर भगाता है',
          },
          phoneticHint: {
            en: 'Include: beans, nitrogen, soil, insects',
            sw: 'Tumia: maharagwe, rutuba, ardhi, wadudu',
            yo: 'Lo: ẹ̀wà, ilẹ̀, marigold, kòkòrò',
            es: 'Incluye: frijol, nitrógeno, suelo, insectos',
            hi: 'बोलें: फलियां, मिट्टी, गेंदा, कीड़ों',
          },
          keywords: {
            en: ['beans', 'nitrogen', 'soil', 'insects'],
            sw: ['maharagwe', 'rutuba', 'wadudu'],
            yo: ['ẹ̀wà', 'ilẹ̀', 'kòkòrò'],
            es: ['frijol', 'nitrógeno', 'suelo', 'insectos'],
            hi: ['फलियां', 'मिट्टी', 'गेंदा', 'कीड़ों'],
          },
        },
      },
    ],
  },
  {
    id: 'digital',
    title: {
      en: 'Digital & Mobile Money Basics',
      sw: 'Misingi ya Kidijitali na Pesa kwa Simu',
      yo: 'Ìpilẹ̀ Ẹ̀rọ Alágbèéká àti Owó Orí-afẹ́fẹ́',
      es: 'Básicos Digitales y Pagos Móviles',
      hi: 'डिजिटल और मोबाइल भुगतान की बुनियाद',
    },
    subtitle: {
      en: 'Protect your mobile wallet PIN, verify payment receipts safely, and save mobile data offline.',
      sw: 'Linda namba yako ya siri, hakiki risiti za malipo kwa usalama, na hifadhi data ya intaneti.',
      yo: 'Dáàbò bo nọ́ńbà ìkọ̀kọ̀ rẹ, yẹ ìwé-ẹ̀rí ìsanwó wò, kí o sì dín lílo dátà kù.',
      es: 'Protege tu PIN móvil, verifica comprobantes de pago y ahorra datos sin conexión.',
      hi: 'अपना मोबाइल पिन सुरक्षित रखें, भुगतान रसीद की जांच करें और इंटरनेट डेटा बचाएं।',
    },
    imageUrl: '/src/assets/images/track_digital_basics_1795231030790.jpg',
    packSizeKb: 390,
    lessons: [
      {
        id: 'dg-1',
        trackId: 'digital',
        order: 1,
        durationMin: 4,
        title: {
          en: 'Protecting Your Mobile Money PIN',
          sw: 'Kulinda Namba Yako ya Siri ya Pesa kwa Simu',
          yo: 'Dídáàbò Bo Nọ́ńbà Ìkọ̀kọ̀ Owó Fóònù Rẹ',
          es: 'Proteger tu PIN de Pagos Móviles',
          hi: 'मोबाइल मनी पिन की सुरक्षा',
        },
        summary: {
          en: 'Spot fake agent calls and spoofed SMS reversal messages before sharing any code.',
          sw: 'Tambua simu feki za mawakala na ujumbe wa ulaghai kabla ya kutoa namba yoyote.',
          yo: 'Mọ ìpè èké àti àtẹ̀jíṣẹ́ ìtànjẹ kí o tó pín kóòdù kankan.',
          es: 'Identifica llamadas falsas y mensajes engañosos antes de compartir códigos.',
          hi: 'किसी को भी ओटीपी या पिन बताने से पहले नकली कॉल और धोखाधड़ी वाले संदेश पहचानें।',
        },
        practiceKind: 'digital-scam',
        segments: [
          {
            id: 'dg-1-s1',
            durationSec: 45,
            title: {
              en: 'Zero-Share PIN Rule',
              sw: 'Kanuni ya Kutoshiriki Namba ya Siri',
              yo: 'Òfin Àìpín Nọ́ńbà Ìkọ̀kọ̀',
              es: 'Nunca Compartas tu PIN',
              hi: 'पिन कभी साझा न करें',
            },
            content: {
              en: {
                spokenText: 'A real mobile money company or bank agent will never ask for your four-digit PIN or one-time verification code on the phone. Hang up immediately and check your official balance menu.',
                phoneticGuide: 'A real a-gent will nev-er ask for your PIN or code.',
                keyTakeaway: 'Never read your PIN or SMS verification code aloud to any caller.',
              },
              sw: {
                spokenText: 'Wakala halisi wa huduma ya pesa au benki hatawahi kukuomba namba yako ya siri au msimbo wa uthibitisho kwa simu. Kata simu mara moja na angalia salio lako rasmi.',
                phoneticGuide: 'Wah-kah-lah hah-lee-see hah-tah-wah-hee koo-koo-ohm-bah neem-bah.',
                keyTakeaway: 'Usitaje kamwe namba yako ya siri kwa mtu yeyote kwenye simu.',
              },
              yo: {
                spokenText: 'Aṣojú ilé-iṣẹ́ owó gidi kò ní béèrè fún nọ́ńbà ìkọ̀kọ̀ rẹ tàbí kóòdù àṣẹ lórí fóònù láé. Gé ìpè náà kíákíá kí o sì ṣàyẹ̀wò ìwọ̀n owó rẹ.',
                phoneticGuide: 'Ah-shoh-joo ee-leh ee-sheh oh-woh gee-dee koh nee beh-reh.',
                keyTakeaway: 'Má ṣe sọ nọ́ńbà ìkọ̀kọ̀ tàbí kóòdù fún ẹnikẹ́ni lórí fóònù.',
              },
              es: {
                spokenText: 'Un agente real nunca te pedirá tu PIN de cuatro dígitos ni tu código temporal por teléfono. Cuelga de inmediato y revisa tu saldo oficial.',
                phoneticGuide: 'Un a-gen-te real nun-ca te pe-di-rá tu PIN por te-lé-fo-no.',
                keyTakeaway: 'Cuelga si alguien pide tu PIN o código por llamada o mensaje.',
              },
              hi: {
                spokenText: 'असली बैंक या मोबाइल वॉलेट एजेंट कभी फोन पर आपका चार अंकों का पिन या ओटीपी कोड नहीं मांगता। तुरंत फोन काटें और खुद अपना बैलेंस जांचें।',
                phoneticGuide: 'Aslee baink ejent kabhee fon par aapkaa pin naheen maangtaa.',
                keyTakeaway: 'किसी भी कॉल पर अपना पिन या ओटीपी कभी न बताएं।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'State the safety rule when someone calls asking for your PIN or code.',
            sw: 'Sema kanuni ya usalama mtu anapopiga simu akiomba namba yako ya siri.',
            yo: 'Sọ òfin ààbò tí ẹnìkan bá pè láti béèrè fún nọ́ńbà ìkọ̀kọ̀ rẹ.',
            es: 'Di la regla de seguridad si alguien llama pidiendo tu PIN o código.',
            hi: 'जब कोई फोन पर पिन या ओटीपी मांगे तो सुरक्षा का नियम बोलकर बताएं।',
          },
          expectedPhrase: {
            en: 'Never share my PIN or verification code hang up and check official balance',
            sw: 'Usishiriki namba ya siri kata simu na angalia salio rasmi',
            yo: 'Má ṣe pín nọ́ńbà ìkọ̀kọ̀ gé ìpè kí o sì ṣàyẹ̀wò owó rẹ',
            es: 'Nunca compartas el PIN cuelga y revisa tu saldo oficial',
            hi: 'पिन और कोड कभी साझा न करें फोन काटें और खुद बैलेंस जांचें',
          },
          phoneticHint: {
            en: 'Include: never, PIN, hang up, balance',
            sw: 'Tumia: usishiriki, siri, kata, salio',
            yo: 'Lo: má, ìkọ̀kọ̀, gé, owó',
            es: 'Incluye: nunca, PIN, cuelga, saldo',
            hi: 'बोलें: पिन, कभी, काटें, बैलेंस',
          },
          keywords: {
            en: ['never', 'pin', 'hang', 'balance'],
            sw: ['siri', 'kata', 'salio'],
            yo: ['ìkọ̀kọ̀', 'gé', 'owó'],
            es: ['nunca', 'pin', 'cuelga', 'saldo'],
            hi: ['पिन', 'काटें', 'बैलेंस'],
          },
        },
      },
      {
        id: 'dg-2',
        trackId: 'digital',
        order: 2,
        durationMin: 4,
        title: {
          en: 'Verifying Merchant Payment Receipts',
          sw: 'Kuhakiki Risiti za Malipo ya Wateja',
          yo: 'Yíyẹ Ìwé-ẹ̀rí Ìsanwó Oníbàárà Wò',
          es: 'Verificar Comprobantes de Pago Móvil',
          hi: 'ग्राहक के डिजिटल भुगतान रसीद की जांच',
        },
        summary: {
          en: 'Check the official sender ID, transaction reference, and exact amount before handing over goods.',
          sw: 'Hakiki jina rasmi la mtumaji, namba ya muamala, na kiasi halisi kabla ya kutoa bidhaa.',
          yo: 'Ṣàyẹ̀wò orúkọ olùfìránṣẹ́ gidi, nọ́ńbà ìdánimọ̀, àti iye owó kí o tó fi ọjà sílẹ̀.',
          es: 'Revisa el remitente oficial, el folio de operación y el monto exacto antes de entregar mercancía.',
          hi: 'सामान देने से पहले अपने फोन पर असली मैसेज, ट्रांजेक्शन नंबर और पूरी रकम की जांच करें।',
        },
        practiceKind: 'digital-receipt',
        segments: [
          {
            id: 'dg-2-s1',
            durationSec: 45,
            title: {
              en: 'Three-Point Receipt Check',
              sw: 'Ukaguzi wa Pointi Tatu',
              yo: 'Àyẹ̀wò Kókó Mẹ́ta',
              es: 'Revisión de Tres Puntos',
              hi: 'रसीद जांच के तीन बिंदु',
            },
            content: {
              en: {
                spokenText: 'Wait for the confirmation message on your own phone rather than trusting a screenshot shown by a buyer. Verify the sender name, the exact amount paid, and that your new balance actually increased.',
                phoneticGuide: 'Wait for con-fir-ma-tion on your own phone; check name, a-mount, and bal-ance.',
                keyTakeaway: 'Always confirm on your own phone that your wallet balance increased.',
              },
              sw: {
                spokenText: 'Subiri ujumbe wa uthibitisho kwenye simu yako mwenyewe badala ya kuamini picha ya skrini ya mteja. Hakiki jina la mtumaji, kiasi halisi, na kwamba salio lako limeongezeka.',
                phoneticGuide: 'Soo-bee-ree oo-joom-beh wah oo-thee-bee-tee-shoh kweh-nyeh see-moo yah-koh.',
                keyTakeaway: 'Hakikisha salio kwenye simu yako limeongezeka kabla ya kutoa bidhaa.',
              },
              yo: {
                spokenText: 'Dúró de àtẹ̀jíṣẹ́ ìdánilójú lórí fóònù tìrẹ dípò gbígbẹ́kẹ̀lé àwòrán ojú-fóònù oníbàárà. Yẹ orúkọ olùfìránṣẹ́, iye owó, àti àlékún àṣẹ́kù rẹ wò.',
                phoneticGuide: 'Doo-roh deh ah-teh-jee-sheh loh-ree foh-noo tee-reh.',
                keyTakeaway: 'Rí i dájú pé àṣẹ́kù owó orí fóònù tìrẹ ti pọ̀ sí i.',
              },
              es: {
                spokenText: 'Espera el mensaje de confirmación en tu propio teléfono en lugar de confiar en una captura de pantalla. Revisa el remitente, el monto exacto y que tu saldo haya subido.',
                phoneticGuide: 'Es-pe-ra el men-sa-je en tu pro-pio te-lé-fo-no.',
                keyTakeaway: 'Confirma en tu propio teléfono que tu saldo aumentó.',
              },
              hi: {
                spokenText: 'ग्राहक के फोन का स्क्रीनशॉट देखने के बजाय अपने खुद के फोन पर आने वाले मैसेज का इंतजार करें। भेजने वाले का नाम, सही रकम और बढ़ा हुआ बैलेंस जरूर जांचें।',
                phoneticGuide: 'Apne khud ke fon par aane waale maisej kaa intazaar karein.',
                keyTakeaway: 'अपने फोन पर बढ़ा हुआ बैलेंस देखे बिना सामान न दें।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Say the three things you verify on your own phone before handing over goods.',
            sw: 'Taja mambo matatu unayohakiki kwenye simu yako kabla ya kutoa bidhaa.',
            yo: 'Sọ ohun mẹ́ta tí o ń yẹ̀ wò lórí fóònù rẹ kí o tó fi ọjà fún oníbàárà.',
            es: 'Di los tres datos que revisas en tu teléfono antes de entregar mercancía.',
            hi: 'सामान देने से पहले अपने फोन पर जांची जाने वाली तीन बातें बताएं।',
          },
          expectedPhrase: {
            en: 'Check confirmation on my own phone verify sender name exact amount and new balance',
            sw: 'Hakiki ujumbe kwenye simu yangu jina rasmi kiasi halisi na salio jipya',
            yo: 'Yẹ àtẹ̀jíṣẹ́ lórí fóònù mi orúkọ olùfìránṣẹ́ iye owó àti àṣẹ́kù tuntun wò',
            es: 'Revisa el mensaje en mi teléfono el remitente monto exacto y nuevo saldo',
            hi: 'अपने फोन पर असली मैसेज नाम सही रकम और नया बैलेंस जांचें',
          },
          phoneticHint: {
            en: 'Include: own phone, sender, amount, balance',
            sw: 'Tumia: simu yangu, kiasi, salio',
            yo: 'Lo: fóònù mi, owó, àṣẹ́kù',
            es: 'Incluye: teléfono, remitente, monto, saldo',
            hi: 'बोलें: फोन, रकम, बैलेंस',
          },
          keywords: {
            en: ['phone', 'sender', 'amount', 'balance'],
            sw: ['simu', 'kiasi', 'salio'],
            yo: ['fóònù', 'owó', 'àṣẹ́kù'],
            es: ['teléfono', 'remitente', 'monto', 'saldo'],
            hi: ['फोन', 'रकम', 'बैलेंस'],
          },
        },
      },
      {
        id: 'dg-3',
        trackId: 'digital',
        order: 3,
        durationMin: 4,
        title: {
          en: 'Saving Mobile Data & Offline Prep',
          sw: 'Kuhifadhi Data na Maandalizi ya Nje ya Mtandao',
          yo: 'Ìfipamọ́ Dátà àti Ìmúrasílẹ̀ Láìsí Íńtánẹ́ẹ̀tì',
          es: 'Ahorrar Datos Móviles y Preparar Uso Sin Red',
          hi: 'मोबाइल डेटा बचाना और ऑफ़लाइन तैयारी',
        },
        summary: {
          en: 'Download lessons and market maps on Wi-Fi and disable background auto-downloads.',
          sw: 'Pakua masomo na ramani ukiwa kwenye Wi-Fi na zima upakuaji wa kiotomatiki.',
          yo: 'Gba àwọn ẹ̀kọ́ sílẹ̀ lórí Wi-Fi kí o sì pa ìgbàsílẹ̀ aládàáṣe lórí dátà.',
          es: 'Descarga lecciones y mapas con Wi-Fi y desactiva descargas automáticas.',
          hi: 'वाई-फ़ाई पर पाठ और नक्शे डाउनलोड करें और बैकग्राउंड ऑटो-डाउनलोड बंद रखें।',
        },
        practiceKind: 'digital-datasaver',
        segments: [
          {
            id: 'dg-3-s1',
            durationSec: 40,
            title: {
              en: 'Zero-Cost Offline Habits',
              sw: 'Tabia za Kuhifadhi Data',
              yo: 'Àṣà Ìfipamọ́ Dátà',
              es: 'Hábitos para Ahorrar Datos',
              hi: 'डेटा बचाने की आदतें',
            },
            content: {
              en: {
                spokenText: 'Turn on Data Saver in phone settings, disable automatic video downloads in messaging apps, and cache your spoken lesson packs when near free Wi-Fi so you can study in the field with zero signal.',
                phoneticGuide: 'Turn on Da-ta Sav-er and cache les-son packs on Wi-Fi.',
                keyTakeaway: 'Cache lessons on Wi-Fi and disable auto-downloading videos on mobile data.',
              },
              sw: {
                spokenText: 'Washa kihifadhi data kwenye mipangilio ya simu, zima upakuaji wa video otomatiki, na hifadhi masomo ya sauti ukiwa kwenye Wi-Fi ili ujifunze shambani bila mtandao.',
                phoneticGuide: 'Wah-shah kee-hee-fah-dhee dah-tah kweh-nyeh mee-pahn-gee-lee-oh.',
                keyTakeaway: 'Hifadhi masomo kwenye Wi-Fi ili uyatumie nje ya mtandao.',
              },
              yo: {
                spokenText: 'Tan olùfipamọ́ dátà lórí fóònù, pa ìgbàsílẹ̀ fídíò aládàáṣe, kí o sì fi àwọn ẹ̀kọ́ pamọ́ lórí Wi-Fi kí o lè kẹ́kọ̀ọ́ ní oko láìsí íńtánẹ́ẹ̀tì.',
                phoneticGuide: 'Tahn oh-loo-fee-pah-moh dah-tah loh-ree foh-noo.',
                keyTakeaway: 'Fi ẹ̀kọ́ pamọ́ lórí Wi-Fi láti kẹ́kọ̀ọ́ láìlo dátà.',
              },
              es: {
                spokenText: 'Activa el ahorro de datos, desactiva la descarga automática de videos en chats y guarda tus lecciones por Wi-Fi para estudiar en el campo sin señal.',
                phoneticGuide: 'Ac-ti-va el a-ho-rro de da-tos y guar-da lec-cio-nes por Wi-Fi.',
                keyTakeaway: 'Descarga con Wi-Fi y desactiva videos automáticos en datos móviles.',
              },
              hi: {
                spokenText: 'फोन में डेटा सेवर चालू करें, मैसेज ऐप में ऑटो-डाउनलोड बंद करें और वाई-फ़ाई से पाठ सेव कर लें ताकि खेत में बिना नेटवर्क के भी सीख सकें।',
                phoneticGuide: 'Fon mein detaa sevar chaaloo karein aur paath sev karein.',
                keyTakeaway: 'वाई-फ़ाई पर पाठ डाउनलोड करें और डेटा पर ऑटो-वीडियो बंद रखें।',
              },
            },
          },
        ],
        voiceChallenge: {
          prompt: {
            en: 'Describe two steps to save mobile data and prepare lessons offline.',
            sw: 'Eleza hatua mbili za kuhifadhi data na kuandaa masomo nje ya mtandao.',
            yo: 'Ṣàlàyé ìgbésẹ̀ méjì láti fi dátà pamọ́ kí o sì lo ẹ̀kọ́ láìsí íńtánẹ́ẹ̀tì.',
            es: 'Describe dos pasos para ahorrar datos y usar lecciones sin conexión.',
            hi: 'मोबाइल डेटा बचाने और ऑफ़लाइन पढ़ाई की दो आदतें बताएं।',
          },
          expectedPhrase: {
            en: 'Enable data saver disable auto video download and cache lessons on wifi',
            sw: 'Washa kihifadhi data zima video otomatiki na hifadhi masomo kwenye wifi',
            yo: 'Tan olùfipamọ́ dátà pa fídíò aládàáṣe kí o sì fi ẹ̀kọ́ pamọ́ lórí wifi',
            es: 'Activa ahorro de datos desactiva videos automáticos y guarda lecciones con wifi',
            hi: 'डेटा सेवर चालू करें ऑटो वीडियो बंद करें और वाईफाई से पाठ सेव करें',
          },
          phoneticHint: {
            en: 'Include: data saver, video, cache/save, wifi',
            sw: 'Tumia: data, video, hifadhi, wifi',
            yo: 'Lo: dátà, fídíò, pamọ́, wifi',
            es: 'Incluye: datos, videos, guarda, wifi',
            hi: 'बोलें: डेटा, वीडियो, सेव, वाईफाई',
          },
          keywords: {
            en: ['data', 'video', 'lessons', 'wifi'],
            sw: ['data', 'video', 'hifadhi', 'wifi'],
            yo: ['dátà', 'fídíò', 'pamọ́', 'wifi'],
            es: ['datos', 'videos', 'guarda', 'wifi'],
            hi: ['डेटा', 'वीडियो', 'सेव', 'वाईफाई'],
          },
        },
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = SKILL_TRACKS.flatMap((t) => t.lessons);

export function getTrackById(trackId: TrackId): SkillTrack {
  return SKILL_TRACKS.find((t) => t.id === trackId) ?? SKILL_TRACKS[0];
}

export function getLessonById(lessonId: string): Lesson {
  return ALL_LESSONS.find((l) => l.id === lessonId) ?? ALL_LESSONS[0];
}
