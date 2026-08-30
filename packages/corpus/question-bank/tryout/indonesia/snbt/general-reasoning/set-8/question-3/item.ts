import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "17" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "19" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "17" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "19" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "17" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "19" }],
        },
      ],
    },
  },
};

export default item;
