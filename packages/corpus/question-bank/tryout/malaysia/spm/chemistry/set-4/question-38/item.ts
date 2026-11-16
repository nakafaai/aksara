import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.2\\text{ g}$$ of glucose, and $$3.84\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: true,
          label:
            "$$18.0\\text{ g}$$ of glucose, and $$3.84\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$18.0\\text{ g}$$ of glucose, and $$4.80\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$18.0\\text{ g}$$ of glucose, and $$1.92\\text{ dm}^3$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.2\\text{ g}$$ glukosa, dan $$3.84\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: true,
          label:
            "$$18.0\\text{ g}$$ glukosa, dan $$3.84\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$18.0\\text{ g}$$ glukosa, dan $$4.80\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$18.0\\text{ g}$$ glukosa, dan $$1.92\\text{ dm}^3$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
