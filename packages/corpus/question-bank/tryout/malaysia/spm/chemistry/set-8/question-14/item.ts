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
        { correct: false, label: "$$0.100\\text{ g}$$, $$0\\text{ g}$$" },
        { correct: true, label: "$$0.050\\text{ g}$$, $$0.081\\text{ g}$$" },
        { correct: false, label: "$$0\\text{ g}$$, $$0.162\\text{ g}$$" },
        { correct: false, label: "$$0.150\\text{ g}$$, $$0\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.100\\text{ g}$$, $$0\\text{ g}$$" },
        { correct: true, label: "$$0.050\\text{ g}$$, $$0.081\\text{ g}$$" },
        { correct: false, label: "$$0\\text{ g}$$, $$0.162\\text{ g}$$" },
        { correct: false, label: "$$0.150\\text{ g}$$, $$0\\text{ g}$$" },
      ],
    },
  },
};

export default item;
