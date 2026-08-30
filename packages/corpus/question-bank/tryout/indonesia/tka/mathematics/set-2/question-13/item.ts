import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(1,5)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(2,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(3,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(3,5)" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(1,5)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(2,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(3,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(3,5)" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(1,5)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(2,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(3,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(3,5)" }],
        },
      ],
    },
  },
};

export default item;
