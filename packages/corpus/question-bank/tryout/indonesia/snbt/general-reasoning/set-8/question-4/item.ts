import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "26" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "27" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "26" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "27" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "26" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "27" }],
        },
      ],
    },
  },
};

export default item;
