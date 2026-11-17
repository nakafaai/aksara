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
            "$$0.320\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$19\\,300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.320\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$9650\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.640\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$19\\,300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.320\\text{ g}$$, $$0.200\\text{ mol dm}^{-3}$$, $$19\\,300\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.320\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$19\\,300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.320\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$9650\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.640\\text{ g}$$, $$0.100\\text{ mol dm}^{-3}$$, $$19\\,300\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.320\\text{ g}$$, $$0.200\\text{ mol dm}^{-3}$$, $$19\\,300\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
