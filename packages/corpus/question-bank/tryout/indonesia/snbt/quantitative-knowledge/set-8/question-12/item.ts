import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6{,}25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6{,}50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}75" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8{,}25" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6.25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6.50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.75" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8.25" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6{,}25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6{,}50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}75" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8{,}25" }],
        },
      ],
    },
  },
};

export default item;
