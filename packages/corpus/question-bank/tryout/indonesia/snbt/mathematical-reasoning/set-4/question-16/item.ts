import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "36" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "52" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "36" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "52" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "36" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "40" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "44" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "52" }],
        },
      ],
    },
  },
};

export default item;
