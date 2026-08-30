import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "32" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "128" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "256" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "512" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "32" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "128" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "256" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "512" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "32" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "128" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "256" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "512" }],
        },
      ],
    },
  },
};

export default item;
