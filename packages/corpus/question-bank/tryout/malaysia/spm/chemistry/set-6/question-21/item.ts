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
            "$$1.04\\text{ g}$$ of lead at the cathode, $$0.800\\text{ g}$$ of bromine at the anode",
        },
        {
          correct: false,
          label:
            "$$2.07\\text{ g}$$ of lead at the cathode, $$1.60\\text{ g}$$ of bromine at the anode",
        },
        {
          correct: false,
          label:
            "$$1.04\\text{ g}$$ of lead at the anode, $$0.800\\text{ g}$$ of bromine at the cathode",
        },
        {
          correct: false,
          label:
            "$$1.04\\text{ g}$$ of lead at the cathode, $$0.400\\text{ g}$$ of bromine at the anode",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.04\\text{ g}$$ plumbum di katod, $$0.800\\text{ g}$$ bromin di anod",
        },
        {
          correct: false,
          label:
            "$$2.07\\text{ g}$$ plumbum di katod, $$1.60\\text{ g}$$ bromin di anod",
        },
        {
          correct: false,
          label:
            "$$1.04\\text{ g}$$ plumbum di anod, $$0.800\\text{ g}$$ bromin di katod",
        },
        {
          correct: false,
          label:
            "$$1.04\\text{ g}$$ plumbum di katod, $$0.400\\text{ g}$$ bromin di anod",
        },
      ],
    },
  },
};

export default item;
