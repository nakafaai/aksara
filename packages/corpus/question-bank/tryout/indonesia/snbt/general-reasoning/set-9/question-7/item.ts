import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Setiap banjir musiman selalu memperbaiki setiap tanah",
        },
        {
          isCorrect: false,
          label:
            "Pengendapan bersih dapat menahan sedimen dan unsur hara di dataran banjir",
        },
        {
          isCorrect: false,
          label:
            "Erosi dapat membawa sedimen dan unsur hara keluar dari dataran banjir",
        },
        {
          isCorrect: false,
          label:
            "Dampak genangan antara lain bergantung pada keseimbangan pengendapan dan erosi",
        },
        {
          isCorrect: false,
          label:
            "Unsur hara yang tertahan dapat mendukung pertumbuhan tanaman jika pengendapan melebihi erosi",
        },
      ],
    },
  },
};

export default item;
