import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{8}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{8}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{17}{6}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{17}{6}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{19}{9}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{8}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{8}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{17}{6}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{17}{6}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{19}{9}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{8}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-\\frac{8}{3}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{17}{6}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-\\frac{17}{6}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{19}{9}" }],
        },
      ],
    },
  },
};

export default item;
