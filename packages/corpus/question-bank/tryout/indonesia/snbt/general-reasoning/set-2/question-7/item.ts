import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "48" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "63" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "48" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "63" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "48" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "63" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
      ],
    },
  },
};

export default item;
