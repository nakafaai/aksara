import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4\\sqrt2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4\\sqrt{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4\\sqrt5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4\\sqrt2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4\\sqrt{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4\\sqrt5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4\\sqrt2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "4\\sqrt{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4\\sqrt5" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12" }],
        },
      ],
    },
  },
};

export default item;
