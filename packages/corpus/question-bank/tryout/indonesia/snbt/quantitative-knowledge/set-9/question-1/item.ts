import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7\\pi\\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "12\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "16\\pi\\text{ cm}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7\\pi\\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "12\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "16\\pi\\text{ cm}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "7\\pi\\text{ cm}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "12\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14\\pi\\text{ cm}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "16\\pi\\text{ cm}" },
          ],
        },
      ],
    },
  },
};

export default item;
