import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tim A",
        },
        {
          correct: true,
          label: "Tim C",
        },
        {
          correct: false,
          label: "Tim B",
        },
        {
          correct: false,
          label: "Tim A dan B",
        },
        {
          correct: false,
          label: "Ketiganya sama",
        },
      ],
    },
  },
};

export default item;
