import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1500\\text{ kg m}^{-3}$$, and $$5.0\\text{ cm}$$ apart",
        },
        {
          correct: false,
          label: "$$900\\text{ kg m}^{-3}$$, and $$1.0\\text{ cm}$$ apart",
        },
        {
          correct: false,
          label: "$$240\\text{ kg m}^{-3}$$, and $$7.6\\text{ cm}$$ apart",
        },
        {
          correct: true,
          label: "$$960\\text{ kg m}^{-3}$$, and $$0.40\\text{ cm}$$ apart",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1500\\text{ kg m}^{-3}$$, dan $$5.0\\text{ cm}$$ jaraknya",
        },
        {
          correct: false,
          label: "$$900\\text{ kg m}^{-3}$$, dan $$1.0\\text{ cm}$$ jaraknya",
        },
        {
          correct: false,
          label: "$$240\\text{ kg m}^{-3}$$, dan $$7.6\\text{ cm}$$ jaraknya",
        },
        {
          correct: true,
          label: "$$960\\text{ kg m}^{-3}$$, dan $$0.40\\text{ cm}$$ jaraknya",
        },
      ],
    },
  },
};

export default item;
