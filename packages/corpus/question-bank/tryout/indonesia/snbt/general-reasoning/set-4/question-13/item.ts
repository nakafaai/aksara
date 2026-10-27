import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "bo bluwpz mwckeeck?",
        },
        {
          correct: false,
          label: "bo ckeeck? bluwwppz",
        },
        {
          correct: false,
          label: "ckeeck? mwbluwpz bo",
        },
        {
          correct: false,
          label: "bo mwbluwpz ckeeck?",
        },
        {
          correct: false,
          label: "mwbluwpz ckeeck? bo",
        },
      ],
    },
  },
};

export default item;
