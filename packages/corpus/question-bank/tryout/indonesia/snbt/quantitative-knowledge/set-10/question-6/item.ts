import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11{.}760" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12{.}000" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13{.}600" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14{.}000" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{.}600" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11{,}760" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12{,}000" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13{,}600" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14{,}000" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{,}600" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11{.}760" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "12{.}000" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "13{.}600" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "14{.}000" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "15{.}600" }],
        },
      ],
    },
  },
};

export default item;
