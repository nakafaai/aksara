import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Zutaten nach Rezeptschritten ordnen: ein Test im Kochkurs",
        },
        {
          isCorrect: false,
          label: "Ausgangsdaten vor der Prüfung der Zutatenanordnung",
        },
        {
          isCorrect: false,
          label: "Gleichzeitige Prüfung mehrerer Änderungen am Kochkurs",
        },
        {
          isCorrect: false,
          label: "Rückmeldungen zur dauerhaften Neugestaltung des Kochkurses",
        },
        {
          isCorrect: false,
          label: "Vollständige Bewertung aller Tätigkeiten im Kochkurs",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Testing Ingredient Grouping by Recipe Stage in a Cooking Class",
        },
        {
          isCorrect: false,
          label: "Baseline Records Before Ingredient Layout Was Tested",
        },
        {
          isCorrect: false,
          label: "Testing Several Simultaneous Changes to a Cooking Class",
        },
        {
          isCorrect: false,
          label: "Reactions to a Permanent Redesign of a Cooking Class",
        },
        {
          isCorrect: false,
          label: "A Complete Evaluation of All Cooking-Class Activities",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengujian Pengelompokan Bahan menurut Tahap Resep di Kelas Memasak",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Susunan Bahan Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak di Kelas Memasak",
        },
        {
          isCorrect: false,
          label: "Tanggapan terhadap Perancangan Ulang Permanen Kelas Memasak",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Kelas Memasak",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
