import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "350" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "250" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "350" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "250" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "350" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "250" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75" }],
        },
      ],
    },
  },
};

export default item;
