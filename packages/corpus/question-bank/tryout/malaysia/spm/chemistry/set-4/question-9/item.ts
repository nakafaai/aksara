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
          label: "Bromine displaces chlorine, and 1.60 g of chlorine forms",
        },
        {
          correct: false,
          label: "Chlorine displaces bromine, and 0.80 g of bromine forms",
        },
        {
          correct: true,
          label:
            "Chlorine displaces bromine, 1.60 g of bromine forms, and the organic layer turns orange-brown",
        },
        {
          correct: false,
          label:
            "Chlorine displaces bromine, 1.60 g of bromine forms, and the organic layer turns purple",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bromin menyesarkan klorin, dan 1.60 g klorin terbentuk",
        },
        {
          correct: false,
          label: "Klorin menyesarkan bromin, dan 0.80 g bromin terbentuk",
        },
        {
          correct: true,
          label:
            "Klorin menyesarkan bromin, 1.60 g bromin terbentuk, dan lapisan organik menjadi perang jingga",
        },
        {
          correct: false,
          label:
            "Klorin menyesarkan bromin, 1.60 g bromin terbentuk, dan lapisan organik menjadi ungu",
        },
      ],
    },
  },
};

export default item;
