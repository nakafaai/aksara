import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "In X, $$60\\text{ cm}^3$$ of oxygen forms and the solution falls to pH $$1$$, and in Y, the silver anode loses $$1.08\\text{ g}$$ and the solution stays at $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "In X, $$120\\text{ cm}^3$$ of oxygen forms and the solution falls to pH $$1$$, and in Y, the silver anode loses $$1.08\\text{ g}$$ and the solution stays at $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "In X, $$60\\text{ cm}^3$$ of oxygen forms and the solution rises to pH $$13$$, and in Y, the silver anode loses $$1.08\\text{ g}$$ and the solution stays at $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "In X, $$60\\text{ cm}^3$$ of oxygen forms and the solution falls to pH $$1$$, and in Y, the silver anode gains $$1.08\\text{ g}$$ and the solution falls to $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam X, $$60\\text{ cm}^3$$ oksigen terbentuk dan larutan turun ke pH $$1$$, dan dalam Y, anod argentum kehilangan $$1.08\\text{ g}$$ dan larutan kekal $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Dalam X, $$120\\text{ cm}^3$$ oksigen terbentuk dan larutan turun ke pH $$1$$, dan dalam Y, anod argentum kehilangan $$1.08\\text{ g}$$ dan larutan kekal $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Dalam X, $$60\\text{ cm}^3$$ oksigen terbentuk dan larutan naik ke pH $$13$$, dan dalam Y, anod argentum kehilangan $$1.08\\text{ g}$$ dan larutan kekal $$0.20\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Dalam X, $$60\\text{ cm}^3$$ oksigen terbentuk dan larutan turun ke pH $$1$$, dan dalam Y, anod argentum bertambah $$1.08\\text{ g}$$ dan larutan berkurang ke $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
