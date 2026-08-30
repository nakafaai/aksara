import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "22 \\text{ cm}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "22 \\text{ cm}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "18 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20 \\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "22 \\text{ cm}" }],
        },
      ],
    },
  },
};

export default item;
