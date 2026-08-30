import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96 \\text{ km/h}" }],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "120 \\text{ km/h}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "24 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "48 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "96 \\text{ km/h}" }],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "120 \\text{ km/h}" },
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
            { display: "block", kind: "math", math: "24 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "72 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "96 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "120 \\text{ km/jam}" },
          ],
        },
      ],
    },
  },
};

export default item;
