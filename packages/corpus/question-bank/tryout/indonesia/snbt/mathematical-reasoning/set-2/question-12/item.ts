import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2{,}4$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}8$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}0$$",
        },
        {
          isCorrect: false,
          label: "$$3{,}2$$",
        },
        {
          isCorrect: false,
          label: "$$3{,}6$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2.4$$",
        },
        {
          isCorrect: false,
          label: "$$1.8$$",
        },
        {
          isCorrect: false,
          label: "$$2.0$$",
        },
        {
          isCorrect: false,
          label: "$$3.2$$",
        },
        {
          isCorrect: false,
          label: "$$3.6$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2{,}4$$",
        },
        {
          isCorrect: false,
          label: "$$1{,}8$$",
        },
        {
          isCorrect: false,
          label: "$$2{,}0$$",
        },
        {
          isCorrect: false,
          label: "$$3{,}2$$",
        },
        {
          isCorrect: false,
          label: "$$3{,}6$$",
        },
      ],
    },
  },
};

export default item;
