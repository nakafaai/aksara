import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "158" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "160" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "168" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "200" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "158" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "160" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "168" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "200" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "120" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "158" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "160" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "168" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "200" }],
        },
      ],
    },
  },
};

export default item;
