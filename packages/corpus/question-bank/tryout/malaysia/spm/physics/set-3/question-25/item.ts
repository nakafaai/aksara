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
          label: "$$600\\text{ kg}$$, and $$0.84\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$200\\text{ kg}$$, and $$0.90\\text{ kg m}^{-3}$$ is already enough",
        },
        {
          correct: true,
          label: "$$200\\text{ kg}$$, and $$0.84\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$200\\text{ kg}$$, and $$0.89\\text{ kg m}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$600\\text{ kg}$$, dan $$0.84\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$200\\text{ kg}$$, dan $$0.90\\text{ kg m}^{-3}$$ sudah mencukupi",
        },
        {
          correct: true,
          label: "$$200\\text{ kg}$$, dan $$0.84\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$200\\text{ kg}$$, dan $$0.89\\text{ kg m}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
