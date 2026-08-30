import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{70}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7}{20}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{12}{70}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{17}{20}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{61}{70}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{70}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7}{20}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{12}{70}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{17}{20}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{61}{70}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{70}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7}{20}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{12}{70}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{17}{20}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{61}{70}" }],
        },
      ],
    },
  },
};

export default item;
