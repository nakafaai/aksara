import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "PQ = 1" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kann nicht bestimmt werden" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "PQ = 1" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cannot be determined" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P > Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "P < Q" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "P = Q" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "PQ = 1" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tidak dapat ditentukan" }],
        },
      ],
    },
  },
};

export default item;
