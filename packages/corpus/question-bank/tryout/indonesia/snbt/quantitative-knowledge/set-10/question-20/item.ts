import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x < y" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "x > y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = -y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x + y = 1" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x < y" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "x > y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = -y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x + y = 1" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x < y" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "x > y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x = -y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x + y = 1" }],
        },
      ],
    },
  },
};

export default item;
