import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$18.4\\text{ g}$$, $$9.60\\text{ dm}^3$$" },
        { correct: false, label: "$$9.2\\text{ g}$$, $$4.80\\text{ dm}^3$$" },
        { correct: false, label: "$$18.4\\text{ g}$$, $$4.80\\text{ dm}^3$$" },
        { correct: false, label: "$$36.8\\text{ g}$$, $$19.2\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$18.4\\text{ g}$$, $$9.60\\text{ dm}^3$$" },
        { correct: false, label: "$$9.2\\text{ g}$$, $$4.80\\text{ dm}^3$$" },
        { correct: false, label: "$$18.4\\text{ g}$$, $$4.80\\text{ dm}^3$$" },
        { correct: false, label: "$$36.8\\text{ g}$$, $$19.2\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
