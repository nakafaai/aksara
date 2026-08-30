import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{4}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{4}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{3}{4}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{4}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{4}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{4}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{3}{4}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{4}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{4}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{4}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{3}{4}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{4}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
      ],
    },
  },
};

export default item;
