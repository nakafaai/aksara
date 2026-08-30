import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
  },
};

export default item;
