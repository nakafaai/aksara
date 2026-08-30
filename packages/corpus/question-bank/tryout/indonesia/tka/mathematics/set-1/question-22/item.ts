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
          label: [{ display: "block", kind: "math", math: "(5,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(6,1)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(6,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(7,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(6,3)" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(5,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(6,1)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(6,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(7,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(6,3)" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(5,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(6,1)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(6,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(7,2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(6,3)" }],
        },
      ],
    },
  },
};

export default item;
