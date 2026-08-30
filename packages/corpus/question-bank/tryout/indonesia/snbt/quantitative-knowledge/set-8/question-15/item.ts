import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "-\\frac{1007}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-\\frac{1008}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{2015}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1007}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1008}{2015}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "-\\frac{1007}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-\\frac{1008}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{2015}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1007}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1008}{2015}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "-\\frac{1007}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-\\frac{1008}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\frac{1}{2015}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1007}{2015}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\frac{1008}{2015}" },
          ],
        },
      ],
    },
  },
};

export default item;
