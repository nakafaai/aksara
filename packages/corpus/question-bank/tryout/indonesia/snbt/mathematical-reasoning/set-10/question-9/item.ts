import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "marathon-water",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$65$$ dus" },
        { correct: false, label: "$$90$$ dus" },
        { correct: false, label: "$$98$$ dus" },
        { correct: false, label: "$$99$$ dus" },
        { correct: true, label: "$$102$$ dus" },
      ],
    },
  },
};

export default item;
