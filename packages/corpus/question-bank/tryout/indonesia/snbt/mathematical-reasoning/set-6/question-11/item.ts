import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "360" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "360" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "360" }],
        },
      ],
    },
  },
};

export default item;
