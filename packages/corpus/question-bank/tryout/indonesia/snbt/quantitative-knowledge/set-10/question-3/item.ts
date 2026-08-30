import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}00033" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}00067" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}0033" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}0067" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}033" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.00033" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.00067" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.0033" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0.0067" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.033" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}00033" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}00067" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}0033" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}0067" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}033" }],
        },
      ],
    },
  },
};

export default item;
