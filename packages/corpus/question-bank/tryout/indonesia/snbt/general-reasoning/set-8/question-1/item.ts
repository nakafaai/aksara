import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "14\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
      ],
    },
  },
};

export default item;
