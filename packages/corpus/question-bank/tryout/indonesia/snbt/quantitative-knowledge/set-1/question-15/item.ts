import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
      ],
    },
  },
};

export default item;
