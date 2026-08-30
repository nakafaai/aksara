import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50 \\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "95 \\text{ km}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50 \\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "95 \\text{ km}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50 \\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "60 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 \\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "95 \\text{ km}" }],
        },
      ],
    },
  },
};

export default item;
