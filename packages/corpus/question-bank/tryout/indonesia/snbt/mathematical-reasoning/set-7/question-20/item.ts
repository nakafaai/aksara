import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "delivery-drone",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "1 kg" },
        { correct: false, label: "1,5 kg" },
        { correct: false, label: "2 kg" },
        { correct: false, label: "2,25 kg" },
        { correct: true, label: "2,5 kg" },
      ],
    },
  },
};

export default item;
