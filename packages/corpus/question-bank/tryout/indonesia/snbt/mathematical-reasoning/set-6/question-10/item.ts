import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parcel-weight",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "5,5 kg" },
        { correct: false, label: "7 kg" },
        { correct: false, label: "7,9 kg" },
        { correct: true, label: "8 kg" },
        { correct: false, label: "8,9 kg" },
      ],
    },
  },
};

export default item;
