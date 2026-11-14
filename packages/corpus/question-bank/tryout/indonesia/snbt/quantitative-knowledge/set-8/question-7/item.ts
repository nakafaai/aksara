import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$22{,}5$$ satuan luas" },
        { correct: false, label: "$$30$$ satuan luas" },
        { correct: false, label: "$$37{,}5$$ satuan luas" },
        { correct: false, label: "$$45$$ satuan luas" },
        { correct: false, label: "$$60$$ satuan luas" },
      ],
    },
  },
};

export default item;
