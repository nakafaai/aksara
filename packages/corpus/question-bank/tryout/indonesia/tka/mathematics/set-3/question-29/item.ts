import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac34" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac45" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac35" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac53" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac54" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac34" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac45" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac35" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac53" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac54" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac34" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac45" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac35" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac53" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac54" }],
        },
      ],
    },
  },
};

export default item;
