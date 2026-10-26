import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sementara itu",
        },
        {
          correct: true,
          label: "Oleh karena itu",
        },
        {
          correct: false,
          label: "Meskipun demikian",
        },
        {
          correct: false,
          label: "Sebagai contoh",
        },
        {
          correct: false,
          label: "Sebelumnya",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
