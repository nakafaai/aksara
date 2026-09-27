import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "bo bluwpz mwckeeck?",
        },
        {
          isCorrect: false,
          label: "bo ckeeck? bluwwppz",
        },
        {
          isCorrect: false,
          label: "ckeeck? mwbluwpz bo",
        },
        {
          isCorrect: false,
          label: "bo mwbluwpz ckeeck?",
        },
        {
          isCorrect: false,
          label: "mwbluwpz ckeeck? bo",
        },
      ],
    },
  },
};

export default item;
