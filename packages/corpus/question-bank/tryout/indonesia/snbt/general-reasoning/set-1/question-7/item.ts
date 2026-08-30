import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "30\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "30\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "30\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\%" }],
        },
      ],
    },
  },
};

export default item;
