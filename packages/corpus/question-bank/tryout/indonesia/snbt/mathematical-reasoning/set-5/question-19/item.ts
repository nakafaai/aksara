import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
      ],
    },
  },
};

export default item;
