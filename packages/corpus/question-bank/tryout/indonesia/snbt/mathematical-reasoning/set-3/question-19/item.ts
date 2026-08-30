import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3{,}2\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6{,}4\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}0\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "7{,}6\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8{,}4\\text{ km}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3.2\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6.4\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.0\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "7.6\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8.4\\text{ km}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "3{,}2\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "6{,}4\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}0\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "7{,}6\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8{,}4\\text{ km}" }],
        },
      ],
    },
  },
};

export default item;
