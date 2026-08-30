import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11" }],
        },
      ],
    },
  },
};

export default item;
