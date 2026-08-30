import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{5}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{3}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{1}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{2}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{5}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{3}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{1}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{2}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{5}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{3}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{1}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{2}" }],
        },
      ],
    },
  },
};

export default item;
