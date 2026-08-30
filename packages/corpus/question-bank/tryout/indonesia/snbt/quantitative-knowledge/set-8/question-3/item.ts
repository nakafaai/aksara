import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A = B" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A = 2B" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "A > B" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A < B" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = \\frac{1}{2}B" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A = B" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A = 2B" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "A > B" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A < B" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = \\frac{1}{2}B" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A = B" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A = 2B" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "A > B" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "A < B" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = \\frac{1}{2}B" },
          ],
        },
      ],
    },
  },
};

export default item;
