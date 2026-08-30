import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15{,}7%$$",
        },
        {
          isCorrect: true,
          label: "$$52{,}3%$$",
        },
        {
          isCorrect: false,
          label: "$$28{,}3%$$",
        },
        {
          isCorrect: false,
          label: "$$34{,}5%$$",
        },
        {
          isCorrect: false,
          label: "$$41{,}8%$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15.7\\%$$",
        },
        {
          isCorrect: true,
          label: "$$52.3\\%$$",
        },
        {
          isCorrect: false,
          label: "$$28.3\\%$$",
        },
        {
          isCorrect: false,
          label: "$$34.5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$41.8\\%$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15{,}7\\%$$",
        },
        {
          isCorrect: true,
          label: "$$52{,}3\\%$$",
        },
        {
          isCorrect: false,
          label: "$$28{,}3\\%$$",
        },
        {
          isCorrect: false,
          label: "$$34{,}5\\%$$",
        },
        {
          isCorrect: false,
          label: "$$41{,}8\\%$$",
        },
      ],
    },
  },
};

export default item;
