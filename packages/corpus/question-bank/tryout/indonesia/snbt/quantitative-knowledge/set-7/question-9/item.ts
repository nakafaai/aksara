import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "144" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "168" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "144" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "168" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "72" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "144" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "168" }],
        },
      ],
    },
  },
};

export default item;
