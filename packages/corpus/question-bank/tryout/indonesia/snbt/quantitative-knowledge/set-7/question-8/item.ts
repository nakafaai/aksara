import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "900" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "600" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "450" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "900" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "600" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "450" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "900" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "600" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "450" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
      ],
    },
  },
};

export default item;
