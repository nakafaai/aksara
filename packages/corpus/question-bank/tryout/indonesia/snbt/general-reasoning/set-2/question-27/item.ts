import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9, 22" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10, 22" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9, 22" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10, 22" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11, 21" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9, 22" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10, 22" }],
        },
      ],
    },
  },
};

export default item;
