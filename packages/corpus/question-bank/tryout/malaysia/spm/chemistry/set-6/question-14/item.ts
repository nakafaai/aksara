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
        { correct: false, label: "$$112\\text{ g}$$, $$272\\text{ g}$$" },
        { correct: false, label: "$$28\\text{ g}$$, $$68\\text{ g}$$" },
        { correct: true, label: "$$56\\text{ g}$$, $$136\\text{ g}$$" },
        { correct: false, label: "$$74\\text{ g}$$, $$136\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$112\\text{ g}$$, $$272\\text{ g}$$" },
        { correct: false, label: "$$28\\text{ g}$$, $$68\\text{ g}$$" },
        { correct: true, label: "$$56\\text{ g}$$, $$136\\text{ g}$$" },
        { correct: false, label: "$$74\\text{ g}$$, $$136\\text{ g}$$" },
      ],
    },
  },
};

export default item;
