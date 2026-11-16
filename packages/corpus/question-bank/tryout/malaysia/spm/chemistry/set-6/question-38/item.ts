import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$584\\text{ g}$$, $$896\\text{ g}$$" },
        { correct: false, label: "$$0.584\\text{ g}$$, $$0.448\\text{ g}$$" },
        { correct: false, label: "$$1168\\text{ g}$$, $$896\\text{ g}$$" },
        { correct: true, label: "$$584\\text{ g}$$, $$448\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$584\\text{ g}$$, $$896\\text{ g}$$" },
        { correct: false, label: "$$0.584\\text{ g}$$, $$0.448\\text{ g}$$" },
        { correct: false, label: "$$1168\\text{ g}$$, $$896\\text{ g}$$" },
        { correct: true, label: "$$584\\text{ g}$$, $$448\\text{ g}$$" },
      ],
    },
  },
};

export default item;
