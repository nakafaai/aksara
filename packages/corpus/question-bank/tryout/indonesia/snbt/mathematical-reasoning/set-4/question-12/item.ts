import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
      ],
    },
  },
};

export default item;
