import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "45" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "45" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "45" }],
        },
      ],
    },
  },
};

export default item;
