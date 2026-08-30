import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10" }],
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
          label: [{ display: "block", kind: "math", math: "2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10" }],
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
          label: [{ display: "block", kind: "math", math: "2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10" }],
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
