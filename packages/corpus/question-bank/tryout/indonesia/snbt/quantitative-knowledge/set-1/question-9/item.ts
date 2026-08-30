import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{I, II und III}" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{I und II}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{II und III}" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{I}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{III}" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{I, II, and III}" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{I and II}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{II and III}" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{I}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{III}" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{I, II, dan III}" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "\\text{I dan II}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{II dan III}" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{I}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "\\text{III}" }],
        },
      ],
    },
  },
};

export default item;
