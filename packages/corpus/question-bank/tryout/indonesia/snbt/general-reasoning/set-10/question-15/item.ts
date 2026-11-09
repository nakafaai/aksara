import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "bazar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nomor 1",
        },
        {
          correct: false,
          label: "nomor 2",
        },
        {
          correct: false,
          label: "nomor 3",
        },
        {
          correct: false,
          label: "nomor 4",
        },
        {
          correct: true,
          label: "nomor 5",
        },
      ],
    },
  },
};

export default item;
