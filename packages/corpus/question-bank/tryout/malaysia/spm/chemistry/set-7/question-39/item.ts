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
        { correct: true, label: "$$1.86\\text{ g}$$, below the guideline" },
        { correct: false, label: "$$0.68\\text{ g}$$, below the guideline" },
        { correct: false, label: "$$1.18\\text{ g}$$, below the guideline" },
        { correct: false, label: "$$8.0\\text{ g}$$, above the guideline" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.86\\text{ g}$$, di bawah garis panduan" },
        { correct: false, label: "$$0.68\\text{ g}$$, di bawah garis panduan" },
        { correct: false, label: "$$1.18\\text{ g}$$, di bawah garis panduan" },
        { correct: false, label: "$$8.0\\text{ g}$$, melebihi garis panduan" },
      ],
    },
  },
};

export default item;
