import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "29" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "73" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "364" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "473" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "29" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "73" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "364" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "473" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "29" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "73" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "364" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "473" }],
        },
      ],
    },
  },
};

export default item;
