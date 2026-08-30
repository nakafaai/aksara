import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25{,}0\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "37{,}5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50{,}0\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "62{,}5\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "66{,}7\\%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25.0\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "37.5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50.0\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "62.5\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "66.7\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25{,}0\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "37{,}5\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "50{,}0\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "62{,}5\\%" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "66{,}7\\%" }],
        },
      ],
    },
  },
};

export default item;
