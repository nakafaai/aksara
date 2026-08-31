import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-4 \\text{ oder } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ oder } -2$$",
        },
        {
          isCorrect: false,
          label: "$$-2 \\text{ oder } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ oder } -3$$",
        },
        {
          isCorrect: false,
          label: "$$3 \\text{ oder } 8$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-4 \\text{ or } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ or } -2$$",
        },
        {
          isCorrect: false,
          label: "$$-2 \\text{ or } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ or } -3$$",
        },
        {
          isCorrect: false,
          label: "$$3 \\text{ or } 8$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-4 \\text{ atau } 2$$",
        },
        {
          isCorrect: true,
          label: "$$4 \\text{ atau } -2$$",
        },
        {
          isCorrect: false,
          label: "$$-2 \\text{ atau } 3$$",
        },
        {
          isCorrect: false,
          label: "$$2 \\text{ atau } -3$$",
        },
        {
          isCorrect: false,
          label: "$$3 \\text{ atau } 8$$",
        },
      ],
    },
  },
};

export default item;
