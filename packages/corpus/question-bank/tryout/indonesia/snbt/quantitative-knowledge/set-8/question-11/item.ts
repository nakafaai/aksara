import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}01" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}36" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10{:}57" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11{:}02" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}01" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}36" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10{:}57" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11{:}02" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}01" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}20" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "10{:}36" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "10{:}57" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "11{:}02" }],
        },
      ],
    },
  },
};

export default item;
