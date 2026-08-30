import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "45^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65^\\circ" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "70^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80^\\circ" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "45^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65^\\circ" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "70^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80^\\circ" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "45^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "65^\\circ" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "70^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "75^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80^\\circ" }],
        },
      ],
    },
  },
};

export default item;
