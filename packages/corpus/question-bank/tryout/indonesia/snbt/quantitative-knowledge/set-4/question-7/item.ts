import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "1, 2, 3" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1 \\text{ und } 3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2 \\text{ und } 4" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 \\text{ nur}" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "alle" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "1, 2, 3" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1 \\text{ and } 3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2 \\text{ and } 4" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 \\text{ only}" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "all" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "1, 2, 3" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1 \\text{ dan } 3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2 \\text{ dan } 4" },
          ],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "4 \\text{ saja}" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "semua" }],
        },
      ],
    },
  },
};

export default item;
