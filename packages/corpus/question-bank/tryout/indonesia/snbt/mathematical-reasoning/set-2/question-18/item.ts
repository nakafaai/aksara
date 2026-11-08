import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "medicine-level",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "200 mg" },
        { correct: true, label: "300 mg" },
        { correct: false, label: "400 mg" },
        { correct: false, label: "500 mg" },
        { correct: false, label: "600 mg" },
      ],
    },
  },
};

export default item;
