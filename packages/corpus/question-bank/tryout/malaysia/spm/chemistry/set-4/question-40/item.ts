import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.27\\text{ g}$$ of magnesium hydroxide; $$500\\text{ cm}^3$$ of stomach acid",
        },
        {
          correct: true,
          label:
            "$$0.58\\text{ g}$$ of magnesium hydroxide; $$400\\text{ cm}^3$$ of stomach acid",
        },
        {
          correct: false,
          label:
            "$$0.58\\text{ g}$$ of magnesium hydroxide; $$200\\text{ cm}^3$$ of stomach acid",
        },
        {
          correct: false,
          label:
            "$$1.00\\text{ g}$$ of magnesium hydroxide; $$400\\text{ cm}^3$$ of stomach acid",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.27\\text{ g}$$ magnesium hidroksida; $$500\\text{ cm}^3$$ asid perut",
        },
        {
          correct: true,
          label:
            "$$0.58\\text{ g}$$ magnesium hidroksida; $$400\\text{ cm}^3$$ asid perut",
        },
        {
          correct: false,
          label:
            "$$0.58\\text{ g}$$ magnesium hidroksida; $$200\\text{ cm}^3$$ asid perut",
        },
        {
          correct: false,
          label:
            "$$1.00\\text{ g}$$ magnesium hidroksida; $$400\\text{ cm}^3$$ asid perut",
        },
      ],
    },
  },
};

export default item;
