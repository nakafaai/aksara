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
            "$$3.20\\text{ g}$$ of copper forms, and the zinc ions reach $$0.050\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.050\\text{ g}$$ of copper forms, and the zinc ions reach $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$3.25\\text{ g}$$ of copper forms, and the zinc ions reach $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$3.20\\text{ g}$$ of copper forms, and the zinc ions reach $$0.20\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.20\\text{ g}$$ kuprum terbentuk, dan ion zink mencapai $$0.050\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.050\\text{ g}$$ kuprum terbentuk, dan ion zink mencapai $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$3.25\\text{ g}$$ kuprum terbentuk, dan ion zink mencapai $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$3.20\\text{ g}$$ kuprum terbentuk, dan ion zink mencapai $$0.20\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
