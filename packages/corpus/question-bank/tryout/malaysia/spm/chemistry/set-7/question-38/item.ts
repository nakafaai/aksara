import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
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
            "$$1.00\\text{ kg}$$ of lactic acid, $$1.83\\text{ kg}$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ kg}$$ of lactic acid, $$0.611\\text{ kg}$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ kg}$$ of lactic acid, $$1.83\\text{ kg}$$ of carbon dioxide",
        },
        {
          correct: true,
          label:
            "$$1.25\\text{ kg}$$ of lactic acid, $$1.83\\text{ kg}$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.00\\text{ kg}$$ asid laktik, $$1.83\\text{ kg}$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ kg}$$ asid laktik, $$0.611\\text{ kg}$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ kg}$$ asid laktik, $$1.83\\text{ kg}$$ karbon dioksida",
        },
        {
          correct: true,
          label:
            "$$1.25\\text{ kg}$$ asid laktik, $$1.83\\text{ kg}$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
