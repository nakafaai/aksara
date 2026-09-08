import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pflanzortetiketten an Mangrovensetzlingstabletts im Test",
        },
        {
          isCorrect: false,
          label: "Ausgangsdaten vor der Prüfung von Tablettetiketten",
        },
        {
          isCorrect: false,
          label:
            "Gleichzeitige Prüfung mehrerer Änderungen an der Setzlingsverteilung",
        },
        {
          isCorrect: false,
          label:
            "Rückmeldungen zur dauerhaften Neugestaltung der Setzlingsverteilung",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung aller Tätigkeiten der Baumschule",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Testing Planting-Site Labels on Mangrove Seedling Trays",
        },
        {
          isCorrect: false,
          label: "Baseline Records Before Tray Labels Were Tested",
        },
        {
          isCorrect: false,
          label:
            "Testing Several Simultaneous Changes to Seedling Distribution",
        },
        {
          isCorrect: false,
          label: "Reactions to a Permanent Redesign of Seedling Distribution",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of All Nursery Activities",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pengujian Label Lokasi pada Baki Bibit Mangrove",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Label Baki Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak dalam Pembagian Bibit",
        },
        {
          isCorrect: false,
          label: "Tanggapan atas Perancangan Ulang Permanen Pembagian Bibit",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Seluruh Kegiatan Pembibitan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
