import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.65\\text{ g}$$" },
        { correct: false, label: "$$1.30\\text{ g}$$" },
        { correct: false, label: "$$0.33\\text{ g}$$" },
        { correct: false, label: "$$6.50\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.65\\text{ g}$$" },
        { correct: false, label: "$$1.30\\text{ g}$$" },
        { correct: false, label: "$$0.33\\text{ g}$$" },
        { correct: false, label: "$$6.50\\text{ g}$$" },
      ],
    },
  },
};

export default item;
