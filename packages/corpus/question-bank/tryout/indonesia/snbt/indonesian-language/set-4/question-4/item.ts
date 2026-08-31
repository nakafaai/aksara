import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *daya generalisasi* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *daya generalisasi* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut memperluas *daya generalisasi* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *daya generalisasi* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *daya generalisasi* menetapkan makna konsep yang diukur sebelum pembaca menafsirkan perbandingan angka dan keterbatasan percobaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
