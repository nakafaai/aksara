import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cinema-pricing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120$$ penonton" },
        { correct: false, label: "$$136$$ penonton" },
        { correct: true, label: "$$152$$ penonton" },
        { correct: false, label: "$$168$$ penonton" },
        { correct: false, label: "$$200$$ penonton" },
      ],
    },
  },
};

export default item;
