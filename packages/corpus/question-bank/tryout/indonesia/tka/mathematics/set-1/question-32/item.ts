import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8\\sqrt2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8\\sqrt3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\sqrt3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\sqrt3" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8\\sqrt2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8\\sqrt3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\sqrt3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\sqrt3" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8\\sqrt2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "8\\sqrt3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\sqrt3" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\sqrt3" }],
        },
      ],
    },
  },
};

export default item;
