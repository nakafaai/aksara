import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-3" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-3" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-3" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "0" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3" }],
        },
      ],
    },
  },
};

export default item;
