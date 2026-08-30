import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5!}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5!" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2(5!)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2(6!)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7!}{2}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5!}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5!" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2(5!)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2(6!)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7!}{2}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5!}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5!" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "2(5!)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2(6!)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7!}{2}" }],
        },
      ],
    },
  },
};

export default item;
