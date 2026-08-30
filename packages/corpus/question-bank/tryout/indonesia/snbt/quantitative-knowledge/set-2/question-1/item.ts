import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
      ],
    },
  },
};

export default item;
