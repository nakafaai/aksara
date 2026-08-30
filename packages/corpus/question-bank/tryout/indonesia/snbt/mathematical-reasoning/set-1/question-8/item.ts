import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x - 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x + 5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5 - x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2x - 5" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x - 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x + 5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5 - x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2x - 5" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x - 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x + 5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5 - x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2x - 5" }],
        },
      ],
    },
  },
};

export default item;
