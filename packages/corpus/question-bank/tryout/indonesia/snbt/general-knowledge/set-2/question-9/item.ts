import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sempit.",
        },
        {
          isCorrect: false,
          label: "terbatas.",
        },
        {
          isCorrect: false,
          label: "kecil.",
        },
        {
          isCorrect: false,
          label: "berkurang.",
        },
        {
          isCorrect: true,
          label: "tinggi.",
        },
      ],
    },
  },
};

export default item;
