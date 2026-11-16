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
          correct: true,
          label:
            "$$0.90\\text{ dm}^3$$ of ethene forms, the bromine water is decolourised, and $$0.78\\text{ dm}^3$$ of ethene passes through unreacted",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ dm}^3$$ of ethene forms, the bromine water is decolourised, and $$1.08\\text{ dm}^3$$ of ethene passes through unreacted",
        },
        {
          correct: false,
          label:
            "$$0.90\\text{ dm}^3$$ of ethene forms, and all of it is absorbed by the bromine water",
        },
        {
          correct: false,
          label:
            "$$0.90\\text{ dm}^3$$ of ethene forms, the bromine water is decolourised, and $$0.66\\text{ dm}^3$$ of ethene passes through unreacted",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.90\\text{ dm}^3$$ etena terbentuk, air bromin dinyahwarnakan, dan $$0.78\\text{ dm}^3$$ etena melaluinya tanpa bertindak balas",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ dm}^3$$ etena terbentuk, air bromin dinyahwarnakan, dan $$1.08\\text{ dm}^3$$ etena melaluinya tanpa bertindak balas",
        },
        {
          correct: false,
          label:
            "$$0.90\\text{ dm}^3$$ etena terbentuk, dan kesemuanya diserap oleh air bromin",
        },
        {
          correct: false,
          label:
            "$$0.90\\text{ dm}^3$$ etena terbentuk, air bromin dinyahwarnakan, dan $$0.66\\text{ dm}^3$$ etena melaluinya tanpa bertindak balas",
        },
      ],
    },
  },
};

export default item;
