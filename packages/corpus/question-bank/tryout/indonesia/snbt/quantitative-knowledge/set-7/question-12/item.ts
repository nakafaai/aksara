import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "13" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "13" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "13" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7" }],
        },
      ],
    },
  },
};

export default item;
