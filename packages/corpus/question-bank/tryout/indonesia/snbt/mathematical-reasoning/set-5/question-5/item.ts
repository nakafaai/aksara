import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "640" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1280" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "720" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "840" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5120" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "640" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1280" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "720" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "840" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5120" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "640" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1280" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "720" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "840" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "5120" }],
        },
      ],
    },
  },
};

export default item;
