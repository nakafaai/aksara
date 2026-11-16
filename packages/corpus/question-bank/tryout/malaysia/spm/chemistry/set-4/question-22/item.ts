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
            "$$1.08\\text{ g}$$ of silver forms, and the copper(II) ions reach $$0.0050\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.76\\text{ g}$$ of silver forms, and the copper(II) ions reach $$0.020\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$1.87\\text{ g}$$ of silver forms, and the copper(II) ions reach $$0.069\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$1.08\\text{ g}$$ of silver forms, and the copper(II) ions reach $$0.020\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.08\\text{ g}$$ argentum terbentuk, dan ion kuprum(II) mencapai $$0.0050\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.76\\text{ g}$$ argentum terbentuk, dan ion kuprum(II) mencapai $$0.020\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$1.87\\text{ g}$$ argentum terbentuk, dan ion kuprum(II) mencapai $$0.069\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$1.08\\text{ g}$$ argentum terbentuk, dan ion kuprum(II) mencapai $$0.020\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
