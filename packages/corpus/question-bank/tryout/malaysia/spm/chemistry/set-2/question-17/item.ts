import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.80\\text{ g}$$" },
        { correct: false, label: "$$1.60\\text{ g}$$" },
        { correct: false, label: "$$0.40\\text{ g}$$" },
        { correct: false, label: "$$0.36\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.80\\text{ g}$$" },
        { correct: false, label: "$$1.60\\text{ g}$$" },
        { correct: false, label: "$$0.40\\text{ g}$$" },
        { correct: false, label: "$$0.36\\text{ g}$$" },
      ],
    },
  },
};

export default item;
