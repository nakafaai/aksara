import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "90 \\text{ Gramm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "92 \\text{ Gramm}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "94 \\text{ Gramm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "96 \\text{ Gramm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "98 \\text{ Gramm}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "90 \\text{ grams}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "92 \\text{ grams}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "94 \\text{ grams}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "96 \\text{ grams}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "98 \\text{ grams}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 \\text{ gram}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "92 \\text{ gram}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "94 \\text{ gram}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96 \\text{ gram}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "98 \\text{ gram}" }],
        },
      ],
    },
  },
};

export default item;
