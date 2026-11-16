import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.74\\text{ g cm}^{-3}$$, $$40.0\\%$$" },
        { correct: true, label: "$$1.74\\text{ g cm}^{-3}$$, $$58.6\\%$$" },
        { correct: false, label: "$$1.52\\text{ g cm}^{-3}$$, $$40.0\\%$$" },
        { correct: false, label: "$$1.74\\text{ g cm}^{-3}$$, $$41.4\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.74\\text{ g cm}^{-3}$$, $$40.0\\%$$" },
        { correct: true, label: "$$1.74\\text{ g cm}^{-3}$$, $$58.6\\%$$" },
        { correct: false, label: "$$1.52\\text{ g cm}^{-3}$$, $$40.0\\%$$" },
        { correct: false, label: "$$1.74\\text{ g cm}^{-3}$$, $$41.4\\%$$" },
      ],
    },
  },
};

export default item;
