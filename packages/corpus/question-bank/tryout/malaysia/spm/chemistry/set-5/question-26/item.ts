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
        {
          correct: true,
          label:
            "$$1.97\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$1.97\\text{ g}$$, $$0.0500\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$3.94\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.63\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.97\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$1.97\\text{ g}$$, $$0.0500\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$3.94\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$2.63\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
