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
            "$$0.508\\text{ g}$$, $$0.120\\text{ mol dm}^{-3}$$, from P to Q",
        },
        {
          correct: false,
          label:
            "$$0.254\\text{ g}$$, $$0.160\\text{ mol dm}^{-3}$$, from Q to P",
        },
        {
          correct: false,
          label:
            "$$0.0508\\text{ g}$$, $$0.192\\text{ mol dm}^{-3}$$, from P to Q",
        },
        {
          correct: true,
          label:
            "$$0.254\\text{ g}$$, $$0.160\\text{ mol dm}^{-3}$$, from P to Q",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.508\\text{ g}$$, $$0.120\\text{ mol dm}^{-3}$$, dari P ke Q",
        },
        {
          correct: false,
          label:
            "$$0.254\\text{ g}$$, $$0.160\\text{ mol dm}^{-3}$$, dari Q ke P",
        },
        {
          correct: false,
          label:
            "$$0.0508\\text{ g}$$, $$0.192\\text{ mol dm}^{-3}$$, dari P ke Q",
        },
        {
          correct: true,
          label:
            "$$0.254\\text{ g}$$, $$0.160\\text{ mol dm}^{-3}$$, dari P ke Q",
        },
      ],
    },
  },
};

export default item;
