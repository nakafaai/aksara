import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44{,}2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "51{,}8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56{,}4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "63{,}5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "67{,}2" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44.2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "51.8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56.4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "63.5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "67.2" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44{,}2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "51{,}8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56{,}4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "63{,}5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "67{,}2" }],
        },
      ],
    },
  },
};

export default item;
