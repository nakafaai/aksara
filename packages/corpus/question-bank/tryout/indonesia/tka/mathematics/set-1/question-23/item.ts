import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-3,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,3)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(-2,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-1,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,5)" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-3,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,3)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(-2,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-1,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,5)" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-3,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,3)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(-2,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-1,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,5)" }],
        },
      ],
    },
  },
};

export default item;
