import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5 \\text{ und } -3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-5 \\text{ und } 3" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\frac{5}{3} \\text{ und } -1",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "-\\frac{5}{3} \\text{ und } 1",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5 \\text{ und } -1" },
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
            { display: "block", kind: "math", math: "5 \\text{ and } -3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-5 \\text{ and } 3" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\frac{5}{3} \\text{ and } -1",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "-\\frac{5}{3} \\text{ and } 1",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5 \\text{ and } -1" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5 \\text{ dan } -3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-5 \\text{ dan } 3" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\frac{5}{3} \\text{ dan } -1",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "-\\frac{5}{3} \\text{ dan } 1",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "5 \\text{ dan } -1" },
          ],
        },
      ],
    },
  },
};

export default item;
