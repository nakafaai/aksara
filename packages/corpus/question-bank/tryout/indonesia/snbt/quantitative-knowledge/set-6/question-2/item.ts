import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40\\%" }],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "33\\frac{1}{3}\\%" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40\\%" }],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "33\\frac{1}{3}\\%" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "40\\%" }],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "33\\frac{1}{3}\\%" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "25\\%" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "20\\%" }],
        },
      ],
    },
  },
};

export default item;
