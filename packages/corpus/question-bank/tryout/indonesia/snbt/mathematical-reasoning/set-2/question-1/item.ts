import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30\\text{ m}^2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90\\text{ m}^2" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30\\text{ m}^2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90\\text{ m}^2" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30\\text{ m}^2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80\\text{ m}^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90\\text{ m}^2" }],
        },
      ],
    },
  },
};

export default item;
