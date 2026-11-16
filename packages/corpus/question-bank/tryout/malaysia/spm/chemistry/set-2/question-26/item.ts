import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The cathode gains $$6.4\\text{ g}$$ and the blue colour fades" },
        { correct: true, label: "The cathode gains $$3.2\\text{ g}$$ and the blue colour stays the same" },
        { correct: false, label: "The cathode gains $$3.2\\text{ g}$$ and the blue colour fades" },
        { correct: false, label: "The anode gains $$3.2\\text{ g}$$ and the blue colour stays the same" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Katod bertambah $$6.4\\text{ g}$$ dan warna biru menjadi pudar" },
        { correct: true, label: "Katod bertambah $$3.2\\text{ g}$$ dan warna biru tidak berubah" },
        { correct: false, label: "Katod bertambah $$3.2\\text{ g}$$ dan warna biru menjadi pudar" },
        { correct: false, label: "Anod bertambah $$3.2\\text{ g}$$ dan warna biru tidak berubah" },
      ],
    },
  },
};

export default item;
