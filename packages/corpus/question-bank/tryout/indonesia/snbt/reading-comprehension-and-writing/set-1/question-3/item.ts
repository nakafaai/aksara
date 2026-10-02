import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "produk.",
        },
        {
          isCorrect: false,
          label: "produktif.",
        },
        {
          isCorrect: true,
          label: "produktivitas.",
        },
        {
          isCorrect: false,
          label: "produksi.",
        },
        {
          isCorrect: false,
          label: "produsen.",
        },
      ],
    },
  },
};

export default item;
