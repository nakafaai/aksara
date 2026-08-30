import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "37" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "38" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "39" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "37" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "38" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "39" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "37" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "38" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "39" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41" }],
        },
      ],
    },
  },
};

export default item;
