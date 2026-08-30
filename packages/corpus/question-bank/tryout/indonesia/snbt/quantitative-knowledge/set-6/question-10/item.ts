import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "34" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "34" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "34" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44" }],
        },
      ],
    },
  },
};

export default item;
