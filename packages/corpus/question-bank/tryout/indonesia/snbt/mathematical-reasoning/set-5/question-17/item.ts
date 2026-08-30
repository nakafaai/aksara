import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "64" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "76" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "64" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "76" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "64" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "76" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
      ],
    },
  },
};

export default item;
