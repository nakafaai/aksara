import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.28\\text{ g}$$, $$40\\%$$" },
        { correct: true, label: "$$1.36\\text{ g}$$, $$30\\%$$" },
        { correct: false, label: "$$1.36\\text{ g}$$, $$100\\%$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$30\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.28\\text{ g}$$, $$40\\%$$" },
        { correct: true, label: "$$1.36\\text{ g}$$, $$30\\%$$" },
        { correct: false, label: "$$1.36\\text{ g}$$, $$100\\%$$" },
        { correct: false, label: "$$1.20\\text{ g}$$, $$30\\%$$" },
      ],
    },
  },
};

export default item;
