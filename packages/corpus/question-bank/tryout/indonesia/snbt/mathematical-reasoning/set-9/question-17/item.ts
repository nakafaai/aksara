import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "factory-shifts",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2{.}616$$ komponen" },
        { correct: false, label: "$$2{.}679$$ komponen" },
        { correct: false, label: "$$2{.}730$$ komponen" },
        { correct: false, label: "$$2{.}820$$ komponen" },
        { correct: false, label: "$$3{.}120$$ komponen" },
      ],
    },
  },
};

export default item;
