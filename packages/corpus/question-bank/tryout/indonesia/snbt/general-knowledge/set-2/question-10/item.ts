import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "pencernaan sempurna.",
        },
        {
          isCorrect: true,
          label: "penyerapan yang tidak sempurna.",
        },
        {
          isCorrect: false,
          label: "fermentasi cepat.",
        },
        {
          isCorrect: false,
          label: "produksi enzim berlebih.",
        },
        {
          isCorrect: false,
          label: "kesukaan terhadap makanan.",
        },
      ],
    },
  },
};

export default item;
