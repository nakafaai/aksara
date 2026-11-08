import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parcel-weight",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "7,5 kg" },
        { correct: false, label: "9 kg" },
        { correct: false, label: "9,9 kg" },
        { correct: true, label: "10 kg" },
        { correct: false, label: "10,9 kg" },
      ],
    },
  },
};

export default item;
