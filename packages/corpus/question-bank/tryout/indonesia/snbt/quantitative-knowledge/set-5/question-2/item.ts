import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{15}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{9}{7}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-3" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{15}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{9}{7}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-3" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{15}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{9}{7}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "-2" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "-3" }],
        },
      ],
    },
  },
};

export default item;
