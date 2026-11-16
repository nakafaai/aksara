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
            "Cathode $$4.8\\text{ dm}^3$$ of hydrogen, anode $$4.8\\text{ dm}^3$$ of oxygen, $$0.509\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "Cathode $$4.8\\text{ dm}^3$$ of hydrogen, anode $$2.4\\text{ dm}^3$$ of oxygen, $$0.509\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Cathode $$4.8\\text{ dm}^3$$ of hydrogen, anode $$2.4\\text{ dm}^3$$ of oxygen, $$0.500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Cathode $$2.4\\text{ dm}^3$$ of hydrogen, anode $$4.8\\text{ dm}^3$$ of oxygen, $$0.509\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Katod $$4.8\\text{ dm}^3$$ hidrogen, anod $$4.8\\text{ dm}^3$$ oksigen, $$0.509\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "Katod $$4.8\\text{ dm}^3$$ hidrogen, anod $$2.4\\text{ dm}^3$$ oksigen, $$0.509\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Katod $$4.8\\text{ dm}^3$$ hidrogen, anod $$2.4\\text{ dm}^3$$ oksigen, $$0.500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Katod $$2.4\\text{ dm}^3$$ hidrogen, anod $$4.8\\text{ dm}^3$$ oksigen, $$0.509\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
