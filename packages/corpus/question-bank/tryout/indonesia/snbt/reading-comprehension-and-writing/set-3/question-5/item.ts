import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebaliknya",
        },
        {
          correct: false,
          label: "Akibatnya",
        },
        {
          correct: false,
          label: "Meskipun demikian",
        },
        {
          correct: true,
          label: "Selain itu",
        },
        {
          correct: false,
          label: "Sebelum itu",
        },
      ],
    },
  },
};

export default item;
