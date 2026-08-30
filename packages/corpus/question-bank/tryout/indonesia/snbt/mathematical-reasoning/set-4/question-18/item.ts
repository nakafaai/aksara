import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "12\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\text{ km}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "12\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\text{ km}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "12\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "16\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\text{ km}" }],
        },
      ],
    },
  },
};

export default item;
