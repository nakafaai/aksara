import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "market-survey",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Pasar X lebih tinggi $$11$$ poin persen" },
        { correct: false, label: "Pasar X dan Pasar Y sama besar" },
        { correct: false, label: "Pasar Y lebih tinggi $$2{,}5$$ poin persen" },
        { correct: false, label: "Pasar Y lebih tinggi $$16$$ poin persen" },
        { correct: false, label: "Pasar Y lebih tinggi $$30$$ poin persen" },
      ],
    },
  },
};

export default item;
