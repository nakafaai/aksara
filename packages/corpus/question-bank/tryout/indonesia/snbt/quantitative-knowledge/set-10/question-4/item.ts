import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-18" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-18" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-18" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
      ],
    },
  },
};

export default item;
