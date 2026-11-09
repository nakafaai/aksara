import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "knockout-cup",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "8 pemain" },
        { correct: false, label: "16 pemain" },
        { correct: false, label: "20 pemain" },
        { correct: true, label: "24 pemain" },
        { correct: false, label: "32 pemain" },
      ],
    },
  },
};

export default item;
