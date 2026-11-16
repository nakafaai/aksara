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
        { correct: false, label: "$$1.05\\text{ g}$$" },
        { correct: false, label: "$$0.72\\text{ g}$$" },
        { correct: true, label: "$$0.85\\text{ g}$$" },
        { correct: false, label: "$$0.69\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.05\\text{ g}$$" },
        { correct: false, label: "$$0.72\\text{ g}$$" },
        { correct: true, label: "$$0.85\\text{ g}$$" },
        { correct: false, label: "$$0.69\\text{ g}$$" },
      ],
    },
  },
};

export default item;
