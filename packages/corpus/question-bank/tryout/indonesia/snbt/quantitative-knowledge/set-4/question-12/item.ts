import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1000" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "800" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "900" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1000" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "800" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "900" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1000" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "800" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "900" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "300" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
  },
};

export default item;
