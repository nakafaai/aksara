import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "77" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "99" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "77" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "99" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "60" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "77" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "99" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "100" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "105" }],
        },
      ],
    },
  },
};

export default item;
