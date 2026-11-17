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
        { correct: false, label: "$$18.8\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: true, label: "$$19.8\\text{ g}$$, $$3.72\\text{ dm}^3$$" },
        { correct: false, label: "$$19.8\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: false, label: "$$17.9\\text{ g}$$, $$3.72\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$18.8\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: true, label: "$$19.8\\text{ g}$$, $$3.72\\text{ dm}^3$$" },
        { correct: false, label: "$$19.8\\text{ g}$$, $$2.40\\text{ dm}^3$$" },
        { correct: false, label: "$$17.9\\text{ g}$$, $$3.72\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
