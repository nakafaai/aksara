import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10" }],
        },
      ],
    },
  },
};

export default item;
