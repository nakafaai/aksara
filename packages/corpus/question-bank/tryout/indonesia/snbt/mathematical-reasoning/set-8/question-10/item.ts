import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "village-trees",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "960" },
        { correct: false, label: "1.065" },
        { correct: false, label: "1.155" },
        { correct: false, label: "1.320" },
        { correct: true, label: "1.380" },
      ],
    },
  },
};

export default item;
