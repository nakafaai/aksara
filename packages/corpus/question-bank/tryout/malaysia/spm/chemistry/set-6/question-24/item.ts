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
          label: "$$1.20\\times10^{22}$$, chlorine is reduced only",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, sodium hydroxide is the oxidising agent",
        },
        {
          correct: true,
          label:
            "$$6.02\\times10^{21}$$, chlorine is both oxidised and reduced",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, chlorine is both oxidised and reduced",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.20\\times10^{22}$$, klorin diturunkan sahaja",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, natrium hidroksida ialah agen pengoksidaan",
        },
        {
          correct: true,
          label:
            "$$6.02\\times10^{21}$$, klorin dioksidakan dan diturunkan serentak",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, klorin dioksidakan dan diturunkan serentak",
        },
      ],
    },
  },
};

export default item;
