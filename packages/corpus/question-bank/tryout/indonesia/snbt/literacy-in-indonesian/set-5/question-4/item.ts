import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *indikator* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *indikator* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut memperluas *indikator* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *indikator* menjelaskan bahwa persentase cahaya mewakili kejernihan visual, sehingga ukuran itu belum cukup untuk menyatakan air aman diminum.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *indikator* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
