import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "57" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "55" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "54" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "53" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "57" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "55" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "54" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "53" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "57" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "56" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "55" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "54" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "53" }],
        },
      ],
    },
  },
};

export default item;
