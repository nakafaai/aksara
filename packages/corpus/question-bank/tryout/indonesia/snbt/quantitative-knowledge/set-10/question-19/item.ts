import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}92" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}82" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1{,}2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}96" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0.92" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.82" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1.2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.96" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}92" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}82" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}7" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1{,}2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}96" }],
        },
      ],
    },
  },
};

export default item;
