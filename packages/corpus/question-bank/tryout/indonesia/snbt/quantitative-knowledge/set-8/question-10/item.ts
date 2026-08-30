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
              math: "m < 0 \\lor m > \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "-\\frac{1}{2} < m < \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "0 < m < \\frac{1}{2}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "0 \\leq m < \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "m < -\\frac{1}{2} \\lor m > 0",
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
              math: "m < 0 \\lor m > \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "-\\frac{1}{2} < m < \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "0 < m < \\frac{1}{2}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "0 \\leq m < \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "m < -\\frac{1}{2} \\lor m > 0",
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
              math: "m < 0 \\lor m > \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "-\\frac{1}{2} < m < \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "0 < m < \\frac{1}{2}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "0 \\leq m < \\frac{1}{2}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "m < -\\frac{1}{2} \\lor m > 0",
            },
          ],
        },
      ],
    },
  },
};

export default item;
