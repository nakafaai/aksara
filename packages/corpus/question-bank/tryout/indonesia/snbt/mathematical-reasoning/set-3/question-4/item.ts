import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8 \\text{ cm}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10 \\text{ cm}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8 \\text{ cm}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10 \\text{ cm}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8 \\text{ cm}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "9 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10 \\text{ cm}" }],
        },
      ],
    },
  },
};

export default item;
