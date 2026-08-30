import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "64" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "64{,}89" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65{,}09" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65{,}20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65{,}34" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "64" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "64.89" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65.09" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65.20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65.34" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "64" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "64{,}89" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65{,}09" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65{,}20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65{,}34" }],
        },
      ],
    },
  },
};

export default item;
