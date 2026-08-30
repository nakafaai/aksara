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
              math: "250\\sqrt{3}\\text{ Meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "250\\sqrt{2}\\text{ Meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "500\\sqrt{3}\\text{ Meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "500\\sqrt{2}\\text{ Meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "250\\text{ Meter}" },
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
              math: "250\\sqrt{3}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "250\\sqrt{2}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "500\\sqrt{3}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "500\\sqrt{2}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "250\\text{ meter}" },
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
              math: "250\\sqrt{3}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "250\\sqrt{2}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "500\\sqrt{3}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "500\\sqrt{2}\\text{ meter}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "250\\text{ meter}" },
          ],
        },
      ],
    },
  },
};

export default item;
