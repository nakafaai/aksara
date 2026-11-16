import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.431\\text{ g}$$, sodium" },
        { correct: false, label: "$$0.431\\text{ g}$$, potassium" },
        { correct: false, label: "$$0.569\\text{ g}$$, sodium" },
        { correct: true, label: "$$0.569\\text{ g}$$, potassium" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.431\\text{ g}$$, natrium" },
        { correct: false, label: "$$0.431\\text{ g}$$, kalium" },
        { correct: false, label: "$$0.569\\text{ g}$$, natrium" },
        { correct: true, label: "$$0.569\\text{ g}$$, kalium" },
      ],
    },
  },
};

export default item;
