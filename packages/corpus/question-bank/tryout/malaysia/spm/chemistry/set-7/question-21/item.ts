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
        { correct: false, label: "$$0.64\\text{ g}$$, colourless" },
        { correct: false, label: "$$1.18\\text{ g}$$, colourless" },
        { correct: true, label: "$$1.02\\text{ g}$$, still blue" },
        { correct: false, label: "$$1.02\\text{ g}$$, colourless" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.64\\text{ g}$$, tanpa warna" },
        { correct: false, label: "$$1.18\\text{ g}$$, tanpa warna" },
        { correct: true, label: "$$1.02\\text{ g}$$, masih biru" },
        { correct: false, label: "$$1.02\\text{ g}$$, tanpa warna" },
      ],
    },
  },
};

export default item;
