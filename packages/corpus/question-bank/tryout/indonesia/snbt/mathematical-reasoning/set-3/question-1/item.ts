import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "220" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "245" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "220" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "245" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "220" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "245" }],
        },
      ],
    },
  },
};

export default item;
