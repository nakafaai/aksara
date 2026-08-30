import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "63" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "81" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "63" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "81" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "63" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "81" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
      ],
    },
  },
};

export default item;
