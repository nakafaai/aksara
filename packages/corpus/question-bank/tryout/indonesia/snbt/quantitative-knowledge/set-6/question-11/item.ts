import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1{,}9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2{,}3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2{,}6" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3{,}6" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1.9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2.3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2.6" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3.6" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1{,}9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2{,}3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2{,}6" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3{,}6" }],
        },
      ],
    },
  },
};

export default item;
