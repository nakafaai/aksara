import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "150\\text{ Gramm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "175\\text{ Gramm}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "225\\text{ Gramm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "250\\text{ Gramm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "275\\text{ Gramm}" },
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
            { display: "block", kind: "math", math: "150\\text{ grams}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "175\\text{ grams}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "225\\text{ grams}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "250\\text{ grams}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "275\\text{ grams}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "150\\text{ gram}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "175\\text{ gram}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "225\\text{ gram}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "250\\text{ gram}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "275\\text{ gram}" }],
        },
      ],
    },
  },
};

export default item;
