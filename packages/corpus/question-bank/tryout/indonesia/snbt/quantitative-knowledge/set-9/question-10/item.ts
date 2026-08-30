import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 8" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "1 : 9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 8" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "1 : 9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 4" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1 : 8" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "1 : 9" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 : 3" }],
        },
      ],
    },
  },
};

export default item;
