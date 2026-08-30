import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{A}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{B}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{C}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{D}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{E}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{A}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{B}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{C}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{D}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{E}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{A}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{B}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{C}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{D}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{E}" }],
        },
      ],
    },
  },
};

export default item;
