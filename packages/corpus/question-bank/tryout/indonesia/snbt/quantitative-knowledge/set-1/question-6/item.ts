import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4x + 3y = 25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3x + 4y = 24" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4x - 3y = 7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3x - 4y = 0" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-3x + 4y = 25" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4x + 3y = 25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3x + 4y = 24" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4x - 3y = 7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3x - 4y = 0" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-3x + 4y = 25" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4x + 3y = 25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3x + 4y = 24" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4x - 3y = 7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3x - 4y = 0" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-3x + 4y = 25" }],
        },
      ],
    },
  },
};

export default item;
