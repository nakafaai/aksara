import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Erste Belege zu kontrastreichere Sammelplatzsymbole im Kontext „Evakuierungsplan“",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Evakuierungsplan“",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Evakuierungsplan“",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung des Kontexts „Evakuierungsplan“",
        },
        {
          isCorrect: true,
          label: "Geordnete Prüfung einer Änderung: Karte der Evakuierungswege",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Early evidence about higher-contrast assembly-point symbols in the context of evacuation route map",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of evacuation route map",
        },
        {
          isCorrect: false,
          label:
            "User reactions to a permanent redesign of evacuation route map",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of evacuation route map",
        },
        {
          isCorrect: true,
          label: "A structured test of one change: evacuation route map",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bukti awal tentang simbol titik kumpul dengan kontras lebih tinggi dalam konteks peta jalur evakuasi",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks peta jalur evakuasi",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada peta jalur evakuasi",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap peta jalur evakuasi",
        },
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: peta jalur evakuasi",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
