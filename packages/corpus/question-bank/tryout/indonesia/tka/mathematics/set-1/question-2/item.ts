import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{4}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{11}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{13}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{4}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{4}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{11}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{13}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{4}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{7}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{3}{4}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{11}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{13}{12}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{5}{4}" }],
        },
      ],
    },
  },
};

export default item;
