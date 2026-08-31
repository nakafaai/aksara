import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *variabel kontrol* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *variabel kontrol* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *variabel kontrol* menetapkan makna konsep yang diukur sebelum pembaca menafsirkan perbandingan angka dan keterbatasan percobaan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut memperluas *variabel kontrol* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *variabel kontrol* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
