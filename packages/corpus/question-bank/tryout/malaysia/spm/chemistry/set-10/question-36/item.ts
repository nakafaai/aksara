import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Propane, $$6.24\\text{ g}$$, $$10.2\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Methane, $$6.24\\text{ g}$$, $$3.41\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "Methane, $$6.24\\text{ g}$$, $$10.2\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Methane, $$2.08\\text{ g}$$, $$3.41\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Propana, $$6.24\\text{ g}$$, $$10.2\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Metana, $$6.24\\text{ g}$$, $$3.41\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "Metana, $$6.24\\text{ g}$$, $$10.2\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Metana, $$2.08\\text{ g}$$, $$3.41\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
