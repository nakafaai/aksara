import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}085" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}095" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}85" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}95" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}075" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.085" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0.095" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.85" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.95" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.075" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}085" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}095" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}85" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}95" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}075" }],
        },
      ],
    },
  },
};

export default item;
