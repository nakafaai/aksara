import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 - x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180 - x" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "180 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Unbekannt" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 - x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180 - x" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "180 - 2x" }],
        },
        { isCorrect: false, label: [{ kind: "text", text: "Unknown" }] },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 - x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "180 - x" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "180 - 2x" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tidak diketahui" }],
        },
      ],
    },
  },
};

export default item;
