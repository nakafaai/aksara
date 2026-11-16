import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "R is magnesium, and its oxide needs no sodium hydroxide because it is basic",
        },
        {
          correct: true,
          label:
            "R is aluminium, and its oxide needs $$20\\text{ cm}^3$$ of the sodium hydroxide solution",
        },
        {
          correct: false,
          label:
            "R is aluminium, and its oxide needs $$10\\text{ cm}^3$$ of the sodium hydroxide solution",
        },
        {
          correct: false,
          label:
            "R is silicon, and its oxide needs $$20\\text{ cm}^3$$ of the sodium hydroxide solution",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "R ialah magnesium, dan oksidanya tidak memerlukan natrium hidroksida kerana ia bersifat bes",
        },
        {
          correct: true,
          label:
            "R ialah aluminium, dan oksidanya memerlukan $$20\\text{ cm}^3$$ larutan natrium hidroksida itu",
        },
        {
          correct: false,
          label:
            "R ialah aluminium, dan oksidanya memerlukan $$10\\text{ cm}^3$$ larutan natrium hidroksida itu",
        },
        {
          correct: false,
          label:
            "R ialah silikon, dan oksidanya memerlukan $$20\\text{ cm}^3$$ larutan natrium hidroksida itu",
        },
      ],
    },
  },
};

export default item;
