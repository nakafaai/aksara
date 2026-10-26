import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
  stimulus: "passage-1",
};

export default item;
