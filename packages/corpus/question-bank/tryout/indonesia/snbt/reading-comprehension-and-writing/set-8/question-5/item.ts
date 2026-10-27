import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Meskipun demikian",
        },
        {
          correct: false,
          label: "Sementara itu",
        },
        {
          correct: false,
          label: "Sebaliknya",
        },
        {
          correct: true,
          label: "Berdasarkan hal itu",
        },
        {
          correct: false,
          label: "Di samping itu",
        },
      ],
    },
  },
};

export default item;
