import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "delivery-drone",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$25\\%$$" },
        { correct: false, label: "$$30\\%$$" },
        { correct: false, label: "$$45\\%$$" },
        { correct: false, label: "$$55\\%$$" },
        { correct: false, label: "$$75\\%$$" },
      ],
    },
  },
};

export default item;
