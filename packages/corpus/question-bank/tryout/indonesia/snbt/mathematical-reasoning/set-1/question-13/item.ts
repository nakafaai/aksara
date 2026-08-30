import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3{,}5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4{,}5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5{,}5" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3.5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4.5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5.5" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3{,}5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4{,}5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5{,}5" }],
        },
      ],
    },
  },
};

export default item;
