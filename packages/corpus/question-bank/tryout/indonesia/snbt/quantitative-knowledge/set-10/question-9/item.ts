import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}52" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}62" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}68" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}70" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0.52" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.62" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.68" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0.70" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "0{,}52" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}62" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}68" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0{,}70" }],
        },
      ],
    },
  },
};

export default item;
