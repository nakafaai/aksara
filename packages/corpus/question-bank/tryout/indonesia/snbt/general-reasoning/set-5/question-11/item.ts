import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
      ],
    },
  },
};

export default item;
