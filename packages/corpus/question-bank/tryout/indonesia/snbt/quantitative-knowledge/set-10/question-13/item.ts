import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; 0{,}875; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12{,}5\\%",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12{,}5\\%; 0{,}875",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; 0{,}875; 12{,}5\\%; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "0{,}875; 1\\frac{1}{8}; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12{,}5\\%",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\frac{1}{\\sqrt{2}}; 1\\frac{1}{8}; 0{,}875; \\frac{3}{4}; 12{,}5\\%",
            },
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
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; 0.875; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12.5\\%",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12.5\\%; 0.875",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; 0.875; 12.5\\%; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "0.875; 1\\frac{1}{8}; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12.5\\%",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\frac{1}{\\sqrt{2}}; 1\\frac{1}{8}; 0.875; \\frac{3}{4}; 12.5\\%",
            },
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
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; 0{,}875; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12{,}5\\%",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12{,}5\\%; 0{,}875",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "1\\frac{1}{8}; 0{,}875; 12{,}5\\%; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "0{,}875; 1\\frac{1}{8}; \\frac{3}{4}; \\frac{1}{\\sqrt{2}}; 12{,}5\\%",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\frac{1}{\\sqrt{2}}; 1\\frac{1}{8}; 0{,}875; \\frac{3}{4}; 12{,}5\\%",
            },
          ],
        },
      ],
    },
  },
};

export default item;
