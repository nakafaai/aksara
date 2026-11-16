import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$ ions, $$6.50\\times10^{23}$$ electrons, and $$\\text{S}^{2-}$$ is larger",
        },
        {
          correct: true,
          label:
            "$$3.61\\times10^{22}$$ ions, $$6.50\\times10^{23}$$ electrons, and $$\\text{S}^{2-}$$ is larger",
        },
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$ ions, $$6.26\\times10^{23}$$ electrons, and $$\\text{S}^{2-}$$ is larger",
        },
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$ ions, $$6.50\\times10^{23}$$ electrons, and $$\\text{K}^+$$ is larger",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$ ion, $$6.50\\times10^{23}$$ elektron, dan $$\\text{S}^{2-}$$ lebih besar",
        },
        {
          correct: true,
          label:
            "$$3.61\\times10^{22}$$ ion, $$6.50\\times10^{23}$$ elektron, dan $$\\text{S}^{2-}$$ lebih besar",
        },
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$ ion, $$6.26\\times10^{23}$$ elektron, dan $$\\text{S}^{2-}$$ lebih besar",
        },
        {
          correct: false,
          label:
            "$$3.61\\times10^{22}$$ ion, $$6.50\\times10^{23}$$ elektron, dan $$\\text{K}^+$$ lebih besar",
        },
      ],
    },
  },
};

export default item;
