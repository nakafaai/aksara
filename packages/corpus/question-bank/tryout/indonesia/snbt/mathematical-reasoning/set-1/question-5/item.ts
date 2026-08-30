import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "21" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "22" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "21" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "22" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "21" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "22" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
      ],
    },
  },
};

export default item;
