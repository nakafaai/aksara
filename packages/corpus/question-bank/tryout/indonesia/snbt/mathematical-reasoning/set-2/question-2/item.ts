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
              math: "2\\text{ m}^2, 3\\text{ m}^2, 4\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 2\\text{ m}^2, 4\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 4\\text{ m}^2, 2\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 4\\text{ m}^2, 5\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "4\\text{ m}^2, 5\\text{ m}^2, 6\\text{ m}^2",
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
              math: "2\\text{ m}^2, 3\\text{ m}^2, 4\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 2\\text{ m}^2, 4\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 4\\text{ m}^2, 2\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 4\\text{ m}^2, 5\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "4\\text{ m}^2, 5\\text{ m}^2, 6\\text{ m}^2",
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
              math: "2\\text{ m}^2, 3\\text{ m}^2, 4\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 2\\text{ m}^2, 4\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 4\\text{ m}^2, 2\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "3\\text{ m}^2, 4\\text{ m}^2, 5\\text{ m}^2",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "4\\text{ m}^2, 5\\text{ m}^2, 6\\text{ m}^2",
            },
          ],
        },
      ],
    },
  },
};

export default item;
