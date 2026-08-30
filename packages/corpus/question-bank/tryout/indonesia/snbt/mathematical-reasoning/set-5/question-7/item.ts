import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "47" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "51" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "85" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "47" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "51" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "85" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "47" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "51" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "85" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92" }],
        },
      ],
    },
  },
};

export default item;
