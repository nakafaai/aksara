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
        { correct: false, label: "$$44\\%$$, $$0.128\\text{ g}$$" },
        { correct: false, label: "$$88\\%$$, $$0.384\\text{ g}$$" },
        { correct: true, label: "$$88\\%$$, $$0.128\\text{ g}$$" },
        { correct: false, label: "$$88\\%$$, $$0.0128\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$44\\%$$, $$0.128\\text{ g}$$" },
        { correct: false, label: "$$88\\%$$, $$0.384\\text{ g}$$" },
        { correct: true, label: "$$88\\%$$, $$0.128\\text{ g}$$" },
        { correct: false, label: "$$88\\%$$, $$0.0128\\text{ g}$$" },
      ],
    },
  },
};

export default item;
