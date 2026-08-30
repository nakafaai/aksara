import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "240" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "360" }],
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "240" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "360" }],
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "240" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "360" }],
        },
      ],
    },
  },
};

export default item;
