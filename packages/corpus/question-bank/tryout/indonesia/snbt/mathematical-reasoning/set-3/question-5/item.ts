import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 : 9" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5 : 2" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 : 9" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5 : 2" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 : 9" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5 : 2" }],
        },
      ],
    },
  },
};

export default item;
