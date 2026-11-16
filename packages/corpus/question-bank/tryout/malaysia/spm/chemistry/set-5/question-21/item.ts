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
            "Anode $$3.6\\text{ dm}^3$$, cathode $$3.6\\text{ dm}^3$$, sodium hydroxide solution",
        },
        {
          correct: false,
          label:
            "Anode $$1.2\\text{ dm}^3$$, cathode $$3.6\\text{ dm}^3$$, sodium hydroxide solution",
        },
        {
          correct: true,
          label:
            "Anode $$2.4\\text{ dm}^3$$, cathode $$3.6\\text{ dm}^3$$, sodium hydroxide solution",
        },
        {
          correct: false,
          label:
            "Anode $$2.4\\text{ dm}^3$$, cathode $$3.6\\text{ dm}^3$$, an acidic solution",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Anod $$3.6\\text{ dm}^3$$, katod $$3.6\\text{ dm}^3$$, larutan natrium hidroksida",
        },
        {
          correct: false,
          label:
            "Anod $$1.2\\text{ dm}^3$$, katod $$3.6\\text{ dm}^3$$, larutan natrium hidroksida",
        },
        {
          correct: true,
          label:
            "Anod $$2.4\\text{ dm}^3$$, katod $$3.6\\text{ dm}^3$$, larutan natrium hidroksida",
        },
        {
          correct: false,
          label:
            "Anod $$2.4\\text{ dm}^3$$, katod $$3.6\\text{ dm}^3$$, larutan berasid",
        },
      ],
    },
  },
};

export default item;
