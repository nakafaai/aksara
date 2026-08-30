import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "20^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50^\\circ" }],
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "20^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50^\\circ" }],
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
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "20^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50^\\circ" }],
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
