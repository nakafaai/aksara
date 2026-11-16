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
            "Iron(II) ions are reduced, and 50.0 cm³ of bromine water is needed",
        },
        {
          correct: false,
          label:
            "Bromine is the reducing agent, and 25.0 cm³ of bromine water is needed",
        },
        {
          correct: false,
          label:
            "Iron(II) ions are oxidised, and 100 cm³ of bromine water is needed",
        },
        {
          correct: true,
          label:
            "Iron(II) ions are oxidised, and 50.0 cm³ of bromine water is needed",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ion ferum(II) diturunkan, dan 50.0 cm³ air bromin diperlukan",
        },
        {
          correct: false,
          label:
            "Bromin ialah agen penurunan, dan 25.0 cm³ air bromin diperlukan",
        },
        {
          correct: false,
          label: "Ion ferum(II) dioksidakan, dan 100 cm³ air bromin diperlukan",
        },
        {
          correct: true,
          label:
            "Ion ferum(II) dioksidakan, dan 50.0 cm³ air bromin diperlukan",
        },
      ],
    },
  },
};

export default item;
