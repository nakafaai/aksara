import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "210" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "42" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "210" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "42" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "210" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "42" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
      ],
    },
  },
};

export default item;
