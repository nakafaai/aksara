import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "31\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "45\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48\\text{ km}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "31\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "45\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48\\text{ km}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "31\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "35\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "45\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48\\text{ km}" }],
        },
      ],
    },
  },
};

export default item;
