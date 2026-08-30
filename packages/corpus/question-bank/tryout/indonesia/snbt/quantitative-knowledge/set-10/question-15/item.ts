import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12, -1" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16, -1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-2, 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12, 16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-1, -2" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12, -1" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16, -1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-2, 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12, 16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-1, -2" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12, -1" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16, -1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-2, 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12, 16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-1, -2" }],
        },
      ],
    },
  },
};

export default item;
