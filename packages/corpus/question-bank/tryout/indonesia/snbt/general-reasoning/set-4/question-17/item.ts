import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5\\text{ km}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5\\text{ km}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "30\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\text{ km}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10\\text{ km}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "5\\text{ km}" }],
        },
      ],
    },
  },
};

export default item;
