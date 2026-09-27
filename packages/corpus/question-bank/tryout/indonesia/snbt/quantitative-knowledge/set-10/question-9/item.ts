import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}62$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}65$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}68$$",
        },
        {
          isCorrect: true,
          label: "$$0{,}52$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}70$$",
        },
      ],
    },
  },
};

export default item;
