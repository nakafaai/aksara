import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "108" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "144" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "108" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "144" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "108" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "144" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180" }],
        },
      ],
    },
  },
};

export default item;
