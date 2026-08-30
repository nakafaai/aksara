import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac13" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac56" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac13" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac56" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac13" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac23" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac56" }],
        },
      ],
    },
  },
};

export default item;
