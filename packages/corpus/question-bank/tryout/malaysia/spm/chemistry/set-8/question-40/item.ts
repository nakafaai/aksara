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
        { correct: false, label: "$$2.23\\text{ dm}^3$$, $$0\\text{ g}$$" },
        { correct: true, label: "$$2.98\\text{ dm}^3$$, $$2.12\\text{ g}$$" },
        { correct: false, label: "$$3.72\\text{ dm}^3$$, $$4.24\\text{ g}$$" },
        { correct: false, label: "$$1.92\\text{ dm}^3$$, $$2.12\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.23\\text{ dm}^3$$, $$0\\text{ g}$$" },
        { correct: true, label: "$$2.98\\text{ dm}^3$$, $$2.12\\text{ g}$$" },
        { correct: false, label: "$$3.72\\text{ dm}^3$$, $$4.24\\text{ g}$$" },
        { correct: false, label: "$$1.92\\text{ dm}^3$$, $$2.12\\text{ g}$$" },
      ],
    },
  },
};

export default item;
