import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20.2\\text{ g}$$" },
        { correct: false, label: "$$0\\text{ g}$$" },
        { correct: false, label: "$$16.0\\text{ g}$$" },
        { correct: true, label: "$$4.2\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$20.2\\text{ g}$$" },
        { correct: false, label: "$$0\\text{ g}$$" },
        { correct: false, label: "$$16.0\\text{ g}$$" },
        { correct: true, label: "$$4.2\\text{ g}$$" },
      ],
    },
  },
};

export default item;
