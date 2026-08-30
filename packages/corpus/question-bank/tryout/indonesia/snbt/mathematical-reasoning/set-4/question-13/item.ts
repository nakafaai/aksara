import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
      ],
    },
  },
};

export default item;
