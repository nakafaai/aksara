import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "battery-drain",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$36\\%$$" },
        { correct: false, label: "$$40\\%$$" },
        { correct: false, label: "$$50\\%$$" },
        { correct: true, label: "$$55\\%$$" },
        { correct: false, label: "$$61\\%$$" },
      ],
    },
  },
};

export default item;
