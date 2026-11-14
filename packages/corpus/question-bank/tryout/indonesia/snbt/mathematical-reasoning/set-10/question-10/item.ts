import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "marathon-water",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$26$$ galon" },
        { correct: true, label: "$$25$$ galon" },
        { correct: false, label: "$$24$$ galon" },
        { correct: false, label: "$$23$$ galon" },
        { correct: false, label: "$$13$$ galon" },
      ],
    },
  },
};

export default item;
