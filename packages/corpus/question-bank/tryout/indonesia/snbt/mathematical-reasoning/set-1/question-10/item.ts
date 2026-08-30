import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "110" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "115" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "110" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "115" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "110" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "115" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
      ],
    },
  },
};

export default item;
