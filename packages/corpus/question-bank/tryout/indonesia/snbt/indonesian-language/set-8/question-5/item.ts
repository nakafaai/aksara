import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengukur transpirasi melalui satu perbandingan awal",
        },
        {
          isCorrect: false,
          label:
            "Menjadikan transpirasi penjelasan tunggal atas hasil pengamatan",
        },
        {
          isCorrect: false,
          label: "Kaidah akhir dari perbandingan pertama tentang transpirasi",
        },
        {
          isCorrect: true,
          label:
            "Pengaruh Lapisan Petroleum Jelly terhadap Kehilangan Massa Daun",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan yang membuat uji lanjutan transpirasi tidak diperlukan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
