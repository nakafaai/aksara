import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "512" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "564" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "624" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "720" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "848" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "512" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "564" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "624" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "720" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "848" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "512" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "564" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "624" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "720" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "848" }],
        },
      ],
    },
  },
};

export default item;
