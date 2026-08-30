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
          label: [{ display: "block", kind: "math", math: "(0,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(1,4)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(1,3)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,3)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,4)" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(0,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(1,4)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(1,3)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,3)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,4)" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(0,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(1,4)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(1,3)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,3)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2,4)" }],
        },
      ],
    },
  },
};

export default item;
