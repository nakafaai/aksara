import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}9$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}9$$",
        },
        {
          isCorrect: true,
          label: "$$3{,}6$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}3$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}6$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0.9$$",
        },
        {
          isCorrect: false,
          label: "$$1.9$$",
        },
        {
          isCorrect: true,
          label: "$$3.6$$",
        },
        {
          isCorrect: false,
          label: "$$2.3$$",
        },
        {
          isCorrect: false,
          label: "$$2.6$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}9$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}9$$",
        },
        {
          isCorrect: true,
          label: "$$3{,}6$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}3$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}6$$",
        },
      ],
    },
  },
};

export default item;
