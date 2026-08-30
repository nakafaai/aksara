import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$13{,}75\\%$$",
        },
        {
          isCorrect: false,
          label: "$$12{,}25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$14{,}50\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15{,}00\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15{,}75\\%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$13.75\\%$$",
        },
        {
          isCorrect: false,
          label: "$$12.25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$14.50\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15.00\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15.75\\%$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$13{,}75\\%$$",
        },
        {
          isCorrect: false,
          label: "$$12{,}25\\%$$",
        },
        {
          isCorrect: false,
          label: "$$14{,}50\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15{,}00\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15{,}75\\%$$",
        },
      ],
    },
  },
};

export default item;
