import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}10" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "7{,}07" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}04" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}01" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.10" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "7.07" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.04" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7.01" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}16" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}10" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "7{,}07" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}04" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7{,}01" }],
        },
      ],
    },
  },
};

export default item;
