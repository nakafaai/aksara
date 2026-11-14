import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "gym-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$11$$ kali" },
        { correct: false, label: "$$12$$ kali" },
        { correct: false, label: "$$13$$ kali" },
        { correct: false, label: "$$15$$ kali" },
        { correct: true, label: "$$16$$ kali" },
      ],
    },
  },
};

export default item;
