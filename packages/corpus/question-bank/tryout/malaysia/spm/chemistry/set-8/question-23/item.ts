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
        { correct: false, label: "$$1.28\\text{ g}$$, $$100\\%$$" },
        { correct: true, label: "$$1.28\\text{ g}$$, $$40\\%$$" },
        { correct: false, label: "$$1.60\\text{ g}$$, $$40\\%$$" },
        { correct: false, label: "$$1.28\\text{ g}$$, $$20\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.28\\text{ g}$$, $$100\\%$$" },
        { correct: true, label: "$$1.28\\text{ g}$$, $$40\\%$$" },
        { correct: false, label: "$$1.60\\text{ g}$$, $$40\\%$$" },
        { correct: false, label: "$$1.28\\text{ g}$$, $$20\\%$$" },
      ],
    },
  },
};

export default item;
