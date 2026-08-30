import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{2} \\text{ kg}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 \\text{ kg}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 \\text{ kg}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6 \\text{ kg}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8 \\text{ kg}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{2} \\text{ kg}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 \\text{ kg}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 \\text{ kg}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6 \\text{ kg}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8 \\text{ kg}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{2} \\text{ kg}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2 \\text{ kg}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 \\text{ kg}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "6 \\text{ kg}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "8 \\text{ kg}" }],
        },
      ],
    },
  },
};

export default item;
