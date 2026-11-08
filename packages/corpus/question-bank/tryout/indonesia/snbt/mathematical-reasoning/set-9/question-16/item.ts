import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "monthly-rainfall",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "103 mm" },
        { correct: false, label: "140 mm" },
        { correct: true, label: "169 mm" },
        { correct: false, label: "175 mm" },
        { correct: false, label: "181 mm" },
      ],
    },
  },
};

export default item;
