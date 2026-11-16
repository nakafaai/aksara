import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80.0\\%$$, $$0.107\\text{ g}$$" },
        { correct: false, label: "$$79.1\\%$$, $$0.0533\\text{ g}$$" },
        { correct: true, label: "$$79.1\\%$$, $$0.107\\text{ g}$$" },
        { correct: false, label: "$$84.0\\%$$, $$0.107\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$80.0\\%$$, $$0.107\\text{ g}$$" },
        { correct: false, label: "$$79.1\\%$$, $$0.0533\\text{ g}$$" },
        { correct: true, label: "$$79.1\\%$$, $$0.107\\text{ g}$$" },
        { correct: false, label: "$$84.0\\%$$, $$0.107\\text{ g}$$" },
      ],
    },
  },
};

export default item;
