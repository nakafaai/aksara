import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur erosi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label: "Menjadikan erosi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang erosi",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Model erosi menggunakan baki tanah",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan erosi tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
