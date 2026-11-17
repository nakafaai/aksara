import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16\\text{ s}$$, $$0.080\\text{ g}$$" },
        { correct: true, label: "$$100\\text{ s}$$, $$0.080\\text{ g}$$" },
        { correct: false, label: "$$100\\text{ s}$$, $$0.096\\text{ g}$$" },
        { correct: false, label: "$$40\\text{ s}$$, $$0.080\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$16\\text{ s}$$, $$0.080\\text{ g}$$" },
        { correct: true, label: "$$100\\text{ s}$$, $$0.080\\text{ g}$$" },
        { correct: false, label: "$$100\\text{ s}$$, $$0.096\\text{ g}$$" },
        { correct: false, label: "$$40\\text{ s}$$, $$0.080\\text{ g}$$" },
      ],
    },
  },
};

export default item;
