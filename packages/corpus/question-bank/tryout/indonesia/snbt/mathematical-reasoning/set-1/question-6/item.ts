import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15\\%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15\\%" }],
        },
      ],
    },
  },
};

export default item;
