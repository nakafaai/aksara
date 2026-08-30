import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{139}{28}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{149}{30}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{154}{31}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{159}{32}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{164}{33}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{139}{28}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{149}{30}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{154}{31}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{159}{32}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{164}{33}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{139}{28}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{149}{30}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{154}{31}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{159}{32}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{164}{33}" }],
        },
      ],
    },
  },
};

export default item;
