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
        { correct: false, label: "$$192\\text{ dm}^3$$, $$320\\text{ g}$$" },
        { correct: false, label: "$$384\\text{ dm}^3$$, $$320\\text{ g}$$" },
        { correct: true, label: "$$384\\text{ dm}^3$$, $$640\\text{ g}$$" },
        { correct: false, label: "$$768\\text{ dm}^3$$, $$1280\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$192\\text{ dm}^3$$, $$320\\text{ g}$$" },
        { correct: false, label: "$$384\\text{ dm}^3$$, $$320\\text{ g}$$" },
        { correct: true, label: "$$384\\text{ dm}^3$$, $$640\\text{ g}$$" },
        { correct: false, label: "$$768\\text{ dm}^3$$, $$1280\\text{ g}$$" },
      ],
    },
  },
};

export default item;
