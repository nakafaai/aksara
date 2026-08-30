import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "26" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "39" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "26" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "39" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "26" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "39" }],
        },
      ],
    },
  },
};

export default item;
