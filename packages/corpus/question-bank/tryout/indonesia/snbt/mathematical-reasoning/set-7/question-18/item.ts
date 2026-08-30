import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18 \\text{ m}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18 \\text{ m}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "9 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16 \\text{ m}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18 \\text{ m}" }],
        },
      ],
    },
  },
};

export default item;
