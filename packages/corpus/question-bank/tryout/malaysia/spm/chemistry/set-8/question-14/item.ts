import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.10\\text{ g}$$" },
        { correct: true, label: "$$0\\text{ g}$$" },
        { correct: false, label: "$$0.20\\text{ g}$$" },
        { correct: false, label: "$$0.05\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.10\\text{ g}$$" },
        { correct: true, label: "$$0\\text{ g}$$" },
        { correct: false, label: "$$0.20\\text{ g}$$" },
        { correct: false, label: "$$0.05\\text{ g}$$" },
      ],
    },
  },
};

export default item;
