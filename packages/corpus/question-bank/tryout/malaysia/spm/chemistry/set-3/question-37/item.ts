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
          correct: true,
          label:
            "$$1.51 \\times 10^{22}$$ molecules, $$2.80\\text{ kg}$$ of propene, and $$3600\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$1.51 \\times 10^{22}$$ molecules, $$1.58\\text{ kg}$$ of propene, and $$3600\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$1.51 \\times 10^{22}$$ molecules, $$2.80\\text{ kg}$$ of propene, and $$1200\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "$$3.01 \\times 10^{25}$$ molecules, $$2.80\\text{ kg}$$ of propene, and $$4800\\text{ dm}^3$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.51 \\times 10^{22}$$ molekul, $$2.80\\text{ kg}$$ propena, dan $$3600\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$1.51 \\times 10^{22}$$ molekul, $$1.58\\text{ kg}$$ propena, dan $$3600\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$1.51 \\times 10^{22}$$ molekul, $$2.80\\text{ kg}$$ propena, dan $$1200\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "$$3.01 \\times 10^{25}$$ molekul, $$2.80\\text{ kg}$$ propena, dan $$4800\\text{ dm}^3$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
