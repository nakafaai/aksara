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
        { correct: false, label: "Butan-1-ol, $$2.04\\text{ g}$$" },
        { correct: false, label: "Propan-1-ol, $$1.22\\text{ g}$$" },
        { correct: true, label: "Butan-1-ol, $$1.22\\text{ g}$$" },
        { correct: false, label: "Butan-1-ol, $$1.06\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Butan-1-ol, $$2.04\\text{ g}$$" },
        { correct: false, label: "Propan-1-ol, $$1.22\\text{ g}$$" },
        { correct: true, label: "Butan-1-ol, $$1.22\\text{ g}$$" },
        { correct: false, label: "Butan-1-ol, $$1.06\\text{ g}$$" },
      ],
    },
  },
};

export default item;
