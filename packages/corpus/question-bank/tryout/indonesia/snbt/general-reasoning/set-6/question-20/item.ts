import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}7%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "28{,}3%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "34{,}5%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41{,}8%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "52{,}3%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15.7\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "28.3\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "34.5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41.8\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "52.3\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}7\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "28{,}3\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "34{,}5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "41{,}8\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "52{,}3\\%" }],
        },
      ],
    },
  },
};

export default item;
