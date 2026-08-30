import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 : 5" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 : 5" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3 : 5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 : 5" }],
        },
      ],
    },
  },
};

export default item;
