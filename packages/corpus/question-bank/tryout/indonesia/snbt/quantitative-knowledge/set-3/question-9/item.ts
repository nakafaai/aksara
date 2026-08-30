import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20^\\circ" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "25^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35^\\circ" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20^\\circ" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "25^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35^\\circ" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20^\\circ" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "25^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30^\\circ" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35^\\circ" }],
        },
      ],
    },
  },
};

export default item;
