import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Erste Belege zu Beispielfotos für jede Zustandskategorie im Kontext „Straßenbaumerhebung“",
        },
        {
          isCorrect: false,
          label:
            "Prüfung mehrerer gleichzeitiger Änderungen im Kontext „Straßenbaumerhebung“",
        },
        {
          isCorrect: true,
          label:
            "Geordnete Prüfung einer Änderung: Erfassung von Straßenbäumen",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung des Kontexts „Straßenbaumerhebung“",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung des Kontexts „Straßenbaumerhebung“",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Early evidence about sample photos for each condition category in the context of street-tree survey",
        },
        {
          isCorrect: false,
          label:
            "Testing several simultaneous changes in the context of street-tree survey",
        },
        {
          isCorrect: true,
          label: "A structured test of one change: street-tree survey",
        },
        {
          isCorrect: false,
          label: "User reactions to a permanent redesign of street-tree survey",
        },
        {
          isCorrect: false,
          label: "A complete evaluation of street-tree survey",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bukti awal tentang foto contoh untuk setiap kategori kondisi dalam konteks survei pohon jalan",
        },
        {
          isCorrect: false,
          label:
            "Pengujian beberapa perubahan serentak dalam konteks survei pohon jalan",
        },
        {
          isCorrect: true,
          label: "Uji Teratur atas Satu Perubahan: pendataan pohon jalan",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan pengguna terhadap perancangan ulang tetap pada survei pohon jalan",
        },
        {
          isCorrect: false,
          label: "Evaluasi menyeluruh terhadap survei pohon jalan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
