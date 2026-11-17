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
        { correct: false, label: "$$0\\text{ g}$$, $$12.5\\text{ g}$$" },
        { correct: false, label: "$$1.00\\text{ g}$$, $$8.00\\text{ g}$$" },
        { correct: false, label: "$$1.00\\text{ g}$$, $$12.5\\text{ g}$$" },
        { correct: true, label: "$$1.00\\text{ g}$$, $$10.0\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0\\text{ g}$$, $$12.5\\text{ g}$$" },
        { correct: false, label: "$$1.00\\text{ g}$$, $$8.00\\text{ g}$$" },
        { correct: false, label: "$$1.00\\text{ g}$$, $$12.5\\text{ g}$$" },
        { correct: true, label: "$$1.00\\text{ g}$$, $$10.0\\text{ g}$$" },
      ],
    },
  },
};

export default item;
