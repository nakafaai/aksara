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
            "Methyl propanoate, $$90\\%$$ pure, giving $$1.44\\text{ g}$$ of methanol",
        },
        {
          correct: false,
          label:
            "Ethyl ethanoate, $$84\\%$$ pure, giving $$2.07\\text{ g}$$ of ethanol",
        },
        {
          correct: true,
          label:
            "Ethyl ethanoate, $$90\\%$$ pure, giving $$2.07\\text{ g}$$ of ethanol",
        },
        {
          correct: false,
          label:
            "Ethyl ethanoate, $$90\\%$$ pure, giving $$2.30\\text{ g}$$ of ethanol",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Metil propanoat, $$90\\%$$ tulen, menghasilkan $$1.44\\text{ g}$$ metanol",
        },
        {
          correct: false,
          label:
            "Etil etanoat, $$84\\%$$ tulen, menghasilkan $$2.07\\text{ g}$$ etanol",
        },
        {
          correct: true,
          label:
            "Etil etanoat, $$90\\%$$ tulen, menghasilkan $$2.07\\text{ g}$$ etanol",
        },
        {
          correct: false,
          label:
            "Etil etanoat, $$90\\%$$ tulen, menghasilkan $$2.30\\text{ g}$$ etanol",
        },
      ],
    },
  },
};

export default item;
