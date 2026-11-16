import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Propyl ethanoate, $$8.16\\text{ g}$$" },
        { correct: true, label: "Ethyl propanoate, $$8.16\\text{ g}$$" },
        { correct: false, label: "Ethyl propanoate, $$10.2\\text{ g}$$" },
        { correct: false, label: "Ethyl propanoate, $$7.04\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Propil etanoat, $$8.16\\text{ g}$$" },
        { correct: true, label: "Etil propanoat, $$8.16\\text{ g}$$" },
        { correct: false, label: "Etil propanoat, $$10.2\\text{ g}$$" },
        { correct: false, label: "Etil propanoat, $$7.04\\text{ g}$$" },
      ],
    },
  },
};

export default item;
