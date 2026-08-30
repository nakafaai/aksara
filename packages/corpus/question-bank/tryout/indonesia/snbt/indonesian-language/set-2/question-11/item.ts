import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(7)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(12)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(29)" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "(32)" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "(2)" }],
        },
      ],
    },
  },
};

export default item;
