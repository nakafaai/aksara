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
            "Methyl propanoate, giving $$1.6\\text{ g}$$ of methanol, with at least $$50\\text{ cm}^3$$ of the alkali",
        },
        {
          correct: false,
          label:
            "Propyl methanoate, giving $$3.0\\text{ g}$$ of propan-1-ol, with at least $$50\\text{ cm}^3$$ of the alkali",
        },
        {
          correct: true,
          label:
            "Ethyl ethanoate, giving $$2.3\\text{ g}$$ of ethanol, with at least $$50\\text{ cm}^3$$ of the alkali",
        },
        {
          correct: false,
          label:
            "Ethyl ethanoate, giving $$2.3\\text{ g}$$ of ethanol, with at least $$100\\text{ cm}^3$$ of the alkali",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Metil propanoat, menghasilkan $$1.6\\text{ g}$$ metanol, dengan sekurang-kurangnya $$50\\text{ cm}^3$$ alkali",
        },
        {
          correct: false,
          label:
            "Propil metanoat, menghasilkan $$3.0\\text{ g}$$ propan-1-ol, dengan sekurang-kurangnya $$50\\text{ cm}^3$$ alkali",
        },
        {
          correct: true,
          label:
            "Etil etanoat, menghasilkan $$2.3\\text{ g}$$ etanol, dengan sekurang-kurangnya $$50\\text{ cm}^3$$ alkali",
        },
        {
          correct: false,
          label:
            "Etil etanoat, menghasilkan $$2.3\\text{ g}$$ etanol, dengan sekurang-kurangnya $$100\\text{ cm}^3$$ alkali",
        },
      ],
    },
  },
};

export default item;
