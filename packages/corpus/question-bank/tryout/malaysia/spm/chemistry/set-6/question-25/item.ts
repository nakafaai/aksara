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
          correct: false,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, the negative plate gains $$24.0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$4.50\\text{ mol dm}^{-3}$$, the negative plate gains $$24.0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3.93\\text{ mol dm}^{-3}$$, the negative plate loses $$51.8\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$3.93\\text{ mol dm}^{-3}$$, the negative plate gains $$24.0\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, plat negatif bertambah $$24.0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$4.50\\text{ mol dm}^{-3}$$, plat negatif bertambah $$24.0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3.93\\text{ mol dm}^{-3}$$, plat negatif berkurang $$51.8\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$3.93\\text{ mol dm}^{-3}$$, plat negatif bertambah $$24.0\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
