import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *atenuasi* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *atenuasi* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut memperluas *atenuasi* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *atenuasi* menetapkan makna konsep yang diukur sebelum pembaca menafsirkan perbandingan angka dan keterbatasan percobaan.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *atenuasi* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
