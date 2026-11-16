import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "0.016 mol dm⁻³, and 125 cm³ of it diluted to 500 cm³ gives 0.10 mol dm⁻³",
        },
        {
          correct: false,
          label:
            "0.40 mol dm⁻³, and 250 cm³ of it diluted to 500 cm³ gives 0.10 mol dm⁻³",
        },
        {
          correct: false,
          label:
            "0.40 mol dm⁻³, and 62.5 cm³ of it diluted to 500 cm³ gives 0.10 mol dm⁻³",
        },
        {
          correct: true,
          label:
            "0.40 mol dm⁻³, and 125 cm³ of it diluted to 500 cm³ gives 0.10 mol dm⁻³",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "0.016 mol dm⁻³, dan 125 cm³ daripadanya dicairkan hingga 500 cm³ memberikan 0.10 mol dm⁻³",
        },
        {
          correct: false,
          label:
            "0.40 mol dm⁻³, dan 250 cm³ daripadanya dicairkan hingga 500 cm³ memberikan 0.10 mol dm⁻³",
        },
        {
          correct: false,
          label:
            "0.40 mol dm⁻³, dan 62.5 cm³ daripadanya dicairkan hingga 500 cm³ memberikan 0.10 mol dm⁻³",
        },
        {
          correct: true,
          label:
            "0.40 mol dm⁻³, dan 125 cm³ daripadanya dicairkan hingga 500 cm³ memberikan 0.10 mol dm⁻³",
        },
      ],
    },
  },
};

export default item;
