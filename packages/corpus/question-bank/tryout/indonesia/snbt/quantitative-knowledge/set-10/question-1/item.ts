import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "V" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "W" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "X" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "Y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "Z" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "V" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "W" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "X" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "Y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "Z" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "V" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "W" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "X" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "Y" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "Z" }],
        },
      ],
    },
  },
};

export default item;
