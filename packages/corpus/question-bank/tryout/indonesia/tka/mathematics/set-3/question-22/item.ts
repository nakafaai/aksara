import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(9,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10,3)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(10,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(11,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10,5)" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(9,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10,3)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(10,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(11,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10,5)" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(9,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10,3)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(10,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(11,4)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10,5)" }],
        },
      ],
    },
  },
};

export default item;
