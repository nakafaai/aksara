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
          label: [{ display: "block", kind: "math", math: "(-3,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(-2,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-1,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,7)" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-3,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(-2,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-1,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,7)" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-3,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(-2,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-1,6)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(-2,7)" }],
        },
      ],
    },
  },
};

export default item;
