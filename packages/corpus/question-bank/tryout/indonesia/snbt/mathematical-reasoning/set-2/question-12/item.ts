import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1{,}8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2{,}0" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2{,}4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3{,}2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3{,}6" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1.8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2.0" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2.4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3.2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3.6" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1{,}8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2{,}0" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2{,}4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3{,}2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3{,}6" }],
        },
      ],
    },
  },
};

export default item;
