import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "warehouse-stock",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120$$ karung" },
        { correct: false, label: "$$110$$ karung" },
        { correct: false, label: "$$100$$ karung" },
        { correct: false, label: "$$85$$ karung" },
        { correct: true, label: "$$80$$ karung" },
      ],
    },
  },
};

export default item;
