import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$230\\text{ g}$$ of salicylic acid and $$204\\text{ g}$$ of ethanoic anhydride",
        },
        {
          correct: true,
          label:
            "$$307\\text{ g}$$ of salicylic acid and $$272\\text{ g}$$ of ethanoic anhydride",
        },
        {
          correct: false,
          label:
            "$$307\\text{ g}$$ of salicylic acid and $$227\\text{ g}$$ of ethanoic anhydride",
        },
        {
          correct: false,
          label:
            "$$300\\text{ g}$$ of salicylic acid and $$272\\text{ g}$$ of ethanoic anhydride",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$230\\text{ g}$$ asid salisilik dan $$204\\text{ g}$$ anhidrida etanoik",
        },
        {
          correct: true,
          label:
            "$$307\\text{ g}$$ asid salisilik dan $$272\\text{ g}$$ anhidrida etanoik",
        },
        {
          correct: false,
          label:
            "$$307\\text{ g}$$ asid salisilik dan $$227\\text{ g}$$ anhidrida etanoik",
        },
        {
          correct: false,
          label:
            "$$300\\text{ g}$$ asid salisilik dan $$272\\text{ g}$$ anhidrida etanoik",
        },
      ],
    },
  },
};

export default item;
