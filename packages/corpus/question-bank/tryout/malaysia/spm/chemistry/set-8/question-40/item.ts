import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$18.8\\text{ g}$$, $$1.20\\text{ dm}^3$$" },
        { correct: true, label: "$$18.8\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: false, label: "$$9.40\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: false, label: "$$37.6\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$18.8\\text{ g}$$, $$1.20\\text{ dm}^3$$" },
        { correct: true, label: "$$18.8\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: false, label: "$$9.40\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: false, label: "$$37.6\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
