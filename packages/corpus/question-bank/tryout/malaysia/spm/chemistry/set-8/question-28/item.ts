import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Ethyl ethanoate, $$3.00\\text{ g}$$" },
        { correct: false, label: "Methyl propanoate, $$6.00\\text{ g}$$" },
        { correct: true, label: "Ethyl ethanoate, $$6.00\\text{ g}$$" },
        { correct: false, label: "Propyl methanoate, $$3.70\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Etil etanoat, $$3.00\\text{ g}$$" },
        { correct: false, label: "Metil propanoat, $$6.00\\text{ g}$$" },
        { correct: true, label: "Etil etanoat, $$6.00\\text{ g}$$" },
        { correct: false, label: "Propil metanoat, $$3.70\\text{ g}$$" },
      ],
    },
  },
};

export default item;
