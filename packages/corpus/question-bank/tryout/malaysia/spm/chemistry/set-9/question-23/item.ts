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
        { correct: false, label: "$$3.20\\text{ g}$$, $$98.2\\%$$, no change" },
        { correct: false, label: "$$3.20\\text{ g}$$, $$88.3\\%$$, no change" },
        {
          correct: false,
          label:
            "$$2.88\\text{ g}$$, $$88.3\\%$$, falls by $$0.0100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$3.20\\text{ g}$$, $$88.3\\%$$, falls by $$0.0100\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.20\\text{ g}$$, $$98.2\\%$$, tidak berubah",
        },
        {
          correct: false,
          label: "$$3.20\\text{ g}$$, $$88.3\\%$$, tidak berubah",
        },
        {
          correct: false,
          label:
            "$$2.88\\text{ g}$$, $$88.3\\%$$, berkurang sebanyak $$0.0100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$3.20\\text{ g}$$, $$88.3\\%$$, berkurang sebanyak $$0.0100\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
