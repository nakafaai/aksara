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
        { correct: false, label: "Propyl methanoate, $$6.16\\text{ g}$$" },
        { correct: true, label: "Methyl propanoate, $$6.16\\text{ g}$$" },
        { correct: false, label: "Methyl propanoate, $$8.80\\text{ g}$$" },
        { correct: false, label: "Methyl propanoate, $$9.24\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Propil metanoat, $$6.16\\text{ g}$$" },
        { correct: true, label: "Metil propanoat, $$6.16\\text{ g}$$" },
        { correct: false, label: "Metil propanoat, $$8.80\\text{ g}$$" },
        { correct: false, label: "Metil propanoat, $$9.24\\text{ g}$$" },
      ],
    },
  },
};

export default item;
