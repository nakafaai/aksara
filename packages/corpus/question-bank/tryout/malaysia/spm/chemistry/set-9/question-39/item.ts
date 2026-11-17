import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.400\\text{ g}$$, $$3.06\\text{ g}$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$3.06\\text{ g}$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$8.90\\text{ g}$$" },
        { correct: true, label: "$$1.20\\text{ g}$$, $$9.18\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.400\\text{ g}$$, $$3.06\\text{ g}$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$3.06\\text{ g}$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$8.90\\text{ g}$$" },
        { correct: true, label: "$$1.20\\text{ g}$$, $$9.18\\text{ g}$$" },
      ],
    },
  },
};

export default item;
