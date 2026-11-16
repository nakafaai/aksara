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
        {
          correct: false,
          label:
            "Sample X $$6.35\\text{ g}$$, sample Y $$6.35\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Sample X $$8.13\\text{ g}$$, sample Y $$8.13\\text{ g}$$, $$1.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Sample X $$8.13\\text{ g}$$, sample Y $$6.35\\text{ g}$$, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "Sample X $$8.13\\text{ g}$$, sample Y $$6.35\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sampel X $$6.35\\text{ g}$$, sampel Y $$6.35\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Sampel X $$8.13\\text{ g}$$, sampel Y $$8.13\\text{ g}$$, $$1.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "Sampel X $$8.13\\text{ g}$$, sampel Y $$6.35\\text{ g}$$, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "Sampel X $$8.13\\text{ g}$$, sampel Y $$6.35\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
