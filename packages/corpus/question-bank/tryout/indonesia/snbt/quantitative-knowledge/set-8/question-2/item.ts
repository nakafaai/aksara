import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "21, 15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20, 14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "19, 13" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "18, 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18, 11" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "21, 15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20, 14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "19, 13" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "18, 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18, 11" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "21, 15" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20, 14" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "19, 13" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "18, 12" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18, 11" }],
        },
      ],
    },
  },
};

export default item;
