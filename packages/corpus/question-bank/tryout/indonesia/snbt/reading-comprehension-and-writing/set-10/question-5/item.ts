import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Oleh karena itu",
        },
        {
          correct: false,
          label: "Selain itu",
        },
        {
          correct: false,
          label: "Dengan kata lain",
        },
        {
          correct: false,
          label: "Sebelumnya",
        },
        {
          correct: true,
          label: "Meskipun demikian",
        },
      ],
    },
  },
};

export default item;
