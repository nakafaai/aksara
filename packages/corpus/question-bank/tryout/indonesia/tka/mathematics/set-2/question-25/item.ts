import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48-2\\pi" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "48-4\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48-8\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "28-4\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48+4\\pi" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48-2\\pi" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "48-4\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48-8\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "28-4\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48+4\\pi" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48-2\\pi" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "48-4\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48-8\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "28-4\\pi" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48+4\\pi" }],
        },
      ],
    },
  },
};

export default item;
