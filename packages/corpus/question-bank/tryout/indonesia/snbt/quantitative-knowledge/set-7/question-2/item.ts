import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = 2x - 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x - 2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x + 4" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "y = 2x + 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x + 12" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = 2x - 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x - 2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x + 4" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "y = 2x + 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x + 12" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = 2x - 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x - 2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x + 4" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "y = 2x + 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "y = -2x + 12" }],
        },
      ],
    },
  },
};

export default item;
