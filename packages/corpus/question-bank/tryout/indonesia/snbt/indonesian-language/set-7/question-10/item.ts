import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur daya dukung melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan daya dukung penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Simulasi populasi dengan keping warna",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang daya dukung",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan daya dukung tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
