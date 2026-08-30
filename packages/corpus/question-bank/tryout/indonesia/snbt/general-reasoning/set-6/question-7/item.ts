import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "85 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "95 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80 \\text{ km/h}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "75 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 \\text{ km/h}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "85 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "95 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "80 \\text{ km/h}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "75 \\text{ km/h}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "90 \\text{ km/h}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "85 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "95 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "80 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "75 \\text{ km/jam}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "90 \\text{ km/jam}" },
          ],
        },
      ],
    },
  },
};

export default item;
