import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "78" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "91" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "104" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "117" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "78" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "91" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "104" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "117" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "78" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "91" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "104" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "117" }],
        },
      ],
    },
  },
};

export default item;
