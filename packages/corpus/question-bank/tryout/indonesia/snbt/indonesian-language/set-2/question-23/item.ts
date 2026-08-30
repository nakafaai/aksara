import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(2)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(5)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(7)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(10)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(4)" }],
        },
      ],
    },
  },
};

export default item;
