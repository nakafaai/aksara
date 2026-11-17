import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$76.2\\%$$, $$2.40\\text{ g}$$" },
        { correct: false, label: "$$26.6\\%$$, $$2.40\\text{ g}$$" },
        { correct: true, label: "$$75.0\\%$$, $$2.40\\text{ g}$$" },
        { correct: false, label: "$$75.0\\%$$, $$3.64\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$76.2\\%$$, $$2.40\\text{ g}$$" },
        { correct: false, label: "$$26.6\\%$$, $$2.40\\text{ g}$$" },
        { correct: true, label: "$$75.0\\%$$, $$2.40\\text{ g}$$" },
        { correct: false, label: "$$75.0\\%$$, $$3.64\\text{ g}$$" },
      ],
    },
  },
};

export default item;
