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
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x < 5, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x > \\frac{5}{4}, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid \\frac{5}{4} < x < 5, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x < 15, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid 5 < x < 15, x \\in \\mathbb{R}\\}",
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
              math: "\\{x \\mid x < 5, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x > \\frac{5}{4}, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid \\frac{5}{4} < x < 5, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x < 15, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid 5 < x < 15, x \\in \\mathbb{R}\\}",
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
              math: "\\{x \\mid x < 5, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x > \\frac{5}{4}, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid \\frac{5}{4} < x < 5, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid x < 15, x \\in \\mathbb{R}\\}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\{x \\mid 5 < x < 15, x \\in \\mathbb{R}\\}",
            },
          ],
        },
      ],
    },
  },
};

export default item;
