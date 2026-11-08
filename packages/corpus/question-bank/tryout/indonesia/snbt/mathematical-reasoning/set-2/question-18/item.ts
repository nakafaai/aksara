import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "medicine-level",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "180 mg" },
        { correct: true, label: "270 mg" },
        { correct: false, label: "360 mg" },
        { correct: false, label: "450 mg" },
        { correct: false, label: "540 mg" },
      ],
    },
  },
};

export default item;
