import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x_0 + 11" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x_0 + 12" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 11" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 12" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 21" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x_0 + 11" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x_0 + 12" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 11" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 12" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 21" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x_0 + 11" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "x_0 + 12" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 11" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 12" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}x_0 + 21" },
          ],
        },
      ],
    },
  },
};

export default item;
