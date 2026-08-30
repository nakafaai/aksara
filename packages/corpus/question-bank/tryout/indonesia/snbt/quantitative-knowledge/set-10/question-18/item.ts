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
              math: "\\{x | -3 \\leq x, x \\in \\text{ganze Zahlen}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x, x \\in \\text{ganze Zahlen}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | x \\leq 7, x \\in \\text{ganze Zahlen}\\}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x \\leq 7, x \\in \\text{ganze Zahlen}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x < 7, x \\in \\text{ganze Zahlen}\\}",
            },
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
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 \\leq x, x \\in \\text{integers}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x, x \\in \\text{integers}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | x \\leq 7, x \\in \\text{integers}\\}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x \\leq 7, x \\in \\text{integers}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x < 7, x \\in \\text{integers}\\}",
            },
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
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 \\leq x, x \\in \\text{bilangan bulat}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x, x \\in \\text{bilangan bulat}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | x \\leq 7, x \\in \\text{bilangan bulat}\\}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x \\leq 7, x \\in \\text{bilangan bulat}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x | -3 < x < 7, x \\in \\text{bilangan bulat}\\}",
            },
          ],
        },
      ],
    },
  },
};

export default item;
