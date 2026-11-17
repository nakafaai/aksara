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
        { correct: false, label: "$$0.0973\\text{ g}$$" },
        { correct: false, label: "$$0.880\\text{ g}$$" },
        { correct: false, label: "$$0.0741\\text{ g}$$" },
        { correct: true, label: "$$0.0232\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.0973\\text{ g}$$" },
        { correct: false, label: "$$0.880\\text{ g}$$" },
        { correct: false, label: "$$0.0741\\text{ g}$$" },
        { correct: true, label: "$$0.0232\\text{ g}$$" },
      ],
    },
  },
};

export default item;
