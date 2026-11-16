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
        { correct: true, label: "$$0.48\\text{ g}$$, two thirds" },
        { correct: false, label: "$$0.96\\text{ g}$$, two thirds" },
        { correct: false, label: "$$0.48\\text{ g}$$, one third" },
        { correct: false, label: "$$0.32\\text{ g}$$, two thirds" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.48\\text{ g}$$, dua pertiga" },
        { correct: false, label: "$$0.96\\text{ g}$$, dua pertiga" },
        { correct: false, label: "$$0.48\\text{ g}$$, satu pertiga" },
        { correct: false, label: "$$0.32\\text{ g}$$, dua pertiga" },
      ],
    },
  },
};

export default item;
