import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3\\sqrt{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2\\sqrt{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\sqrt{2}" }],
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
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{2}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3\\sqrt{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2\\sqrt{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\sqrt{2}" }],
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
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{2}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "3\\sqrt{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "2\\sqrt{2}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\sqrt{2}" }],
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
            { display: "block", kind: "math", math: "\\frac{1}{3}\\sqrt{2}" },
          ],
        },
      ],
    },
  },
};

export default item;
