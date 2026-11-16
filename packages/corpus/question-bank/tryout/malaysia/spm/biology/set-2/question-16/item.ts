import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "cellular-respiration",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.5\\text{ mol}$$ of glucose and $$0.5\\text{ mol}$$ of lactic acid",
        },
        {
          correct: false,
          label:
            "$$0.026\\text{ mol}$$ of glucose and $$0.052\\text{ mol}$$ of lactic acid",
        },
        {
          correct: false,
          label:
            "$$1\\text{ mol}$$ of glucose and $$2\\text{ mol}$$ of lactic acid",
        },
        {
          correct: true,
          label:
            "$$0.5\\text{ mol}$$ of glucose and $$1\\text{ mol}$$ of lactic acid",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.5\\text{ mol}$$ glukosa dan $$0.5\\text{ mol}$$ asid laktik",
        },
        {
          correct: false,
          label:
            "$$0.026\\text{ mol}$$ glukosa dan $$0.052\\text{ mol}$$ asid laktik",
        },
        {
          correct: false,
          label: "$$1\\text{ mol}$$ glukosa dan $$2\\text{ mol}$$ asid laktik",
        },
        {
          correct: true,
          label:
            "$$0.5\\text{ mol}$$ glukosa dan $$1\\text{ mol}$$ asid laktik",
        },
      ],
    },
  },
};

export default item;
