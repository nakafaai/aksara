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
          correct: false,
          label:
            "$$1.2\\text{ dm}^3$$ of oxygen at the anode and $$2.4\\text{ dm}^3$$ of hydrogen at the cathode",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ dm}^3$$ of chlorine at the anode and $$4.6\\text{ g}$$ of sodium at the cathode",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ dm}^3$$ of chlorine at the anode, $$2.4\\text{ dm}^3$$ of hydrogen at the cathode, and $$0.20\\text{ mol}$$ of sodium hydroxide in the solution",
        },
        {
          correct: false,
          label:
            "$$4.8\\text{ dm}^3$$ of chlorine at the anode and $$4.8\\text{ dm}^3$$ of hydrogen at the cathode",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.2\\text{ dm}^3$$ oksigen di anod dan $$2.4\\text{ dm}^3$$ hidrogen di katod",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ dm}^3$$ klorin di anod dan $$4.6\\text{ g}$$ natrium di katod",
        },
        {
          correct: true,
          label:
            "$$2.4\\text{ dm}^3$$ klorin di anod, $$2.4\\text{ dm}^3$$ hidrogen di katod, dan $$0.20\\text{ mol}$$ natrium hidroksida dalam larutan",
        },
        {
          correct: false,
          label:
            "$$4.8\\text{ dm}^3$$ klorin di anod dan $$4.8\\text{ dm}^3$$ hidrogen di katod",
        },
      ],
    },
  },
};

export default item;
