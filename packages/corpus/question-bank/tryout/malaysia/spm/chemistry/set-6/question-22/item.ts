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
            "Cathode $$4.8\\text{ dm}^3$$ of hydrogen, anode $$4.8\\text{ dm}^3$$ of oxygen, the acid becomes slightly more concentrated",
        },
        {
          correct: true,
          label:
            "Cathode $$4.8\\text{ dm}^3$$ of hydrogen, anode $$2.4\\text{ dm}^3$$ of oxygen, the acid becomes slightly more concentrated",
        },
        {
          correct: false,
          label:
            "Cathode $$4.8\\text{ dm}^3$$ of hydrogen, anode $$2.4\\text{ dm}^3$$ of oxygen, the acid's concentration stays the same",
        },
        {
          correct: false,
          label:
            "Cathode $$2.4\\text{ dm}^3$$ of hydrogen, anode $$4.8\\text{ dm}^3$$ of oxygen, the acid becomes slightly more concentrated",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Katod $$4.8\\text{ dm}^3$$ hidrogen, anod $$4.8\\text{ dm}^3$$ oksigen, asid menjadi sedikit lebih pekat",
        },
        {
          correct: true,
          label:
            "Katod $$4.8\\text{ dm}^3$$ hidrogen, anod $$2.4\\text{ dm}^3$$ oksigen, asid menjadi sedikit lebih pekat",
        },
        {
          correct: false,
          label:
            "Katod $$4.8\\text{ dm}^3$$ hidrogen, anod $$2.4\\text{ dm}^3$$ oksigen, kepekatan asid kekal sama",
        },
        {
          correct: false,
          label:
            "Katod $$2.4\\text{ dm}^3$$ hidrogen, anod $$4.8\\text{ dm}^3$$ oksigen, asid menjadi sedikit lebih pekat",
        },
      ],
    },
  },
};

export default item;
