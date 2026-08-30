import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "55" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
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
          label: [{ display: "block", kind: "math", math: "50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "55" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
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
          label: [{ display: "block", kind: "math", math: "50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "55" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "65" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70" }],
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
