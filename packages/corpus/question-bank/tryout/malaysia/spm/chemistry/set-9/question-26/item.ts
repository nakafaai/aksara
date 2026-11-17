import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$ hydrogen at the cathode, $$240\\text{ cm}^3$$ chlorine at the anode, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$ hydrogen at the cathode, $$60\\text{ cm}^3$$ oxygen at the anode, $$0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$ hydrogen at the cathode, $$120\\text{ cm}^3$$ chlorine at the anode, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$ hydrogen at the cathode, $$120\\text{ cm}^3$$ chlorine at the anode, $$0.0250\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$ hidrogen di katod, $$240\\text{ cm}^3$$ klorin di anod, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$ hidrogen di katod, $$60\\text{ cm}^3$$ oksigen di anod, $$0\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$ hidrogen di katod, $$120\\text{ cm}^3$$ klorin di anod, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$ hidrogen di katod, $$120\\text{ cm}^3$$ klorin di anod, $$0.0250\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
