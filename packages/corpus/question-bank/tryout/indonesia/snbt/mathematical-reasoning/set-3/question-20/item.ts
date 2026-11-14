import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "warehouse-stock",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$75$$ karung" },
        { correct: false, label: "$$85$$ karung" },
        { correct: false, label: "$$95$$ karung" },
        { correct: false, label: "$$120$$ karung" },
        { correct: false, label: "$$125$$ karung" },
      ],
    },
  },
};

export default item;
