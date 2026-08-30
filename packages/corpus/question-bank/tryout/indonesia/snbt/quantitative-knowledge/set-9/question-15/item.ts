import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x > y" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "x < y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = 4y" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x > y" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "x < y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = 4y" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x > y" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "x < y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = 4y" }],
        },
      ],
    },
  },
};

export default item;
