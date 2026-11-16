import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.10\\text{ mol}$$ of trichloromethane only, and $$1.0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.050\\text{ mol}$$ of each, and $$2.0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$0.050\\text{ mol}$$ of each, and $$1.0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.025\\text{ mol}$$ of dichloromethane and $$0.075\\text{ mol}$$ of trichloromethane, and $$1.0\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.10\\text{ mol}$$ triklorometana sahaja, dan $$1.0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.050\\text{ mol}$$ setiap satu, dan $$2.0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$0.050\\text{ mol}$$ setiap satu, dan $$1.0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.025\\text{ mol}$$ diklorometana dan $$0.075\\text{ mol}$$ triklorometana, dan $$1.0\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
