import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{2}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{3}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}\\sqrt{2}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{3}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{2}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{3}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}\\sqrt{2}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{3}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "1" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{2}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{3}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{2}\\sqrt{2}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{3}" },
          ],
        },
      ],
    },
  },
};

export default item;
