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
          correct: true,
          label:
            "Chlorine is limiting; 8.9 g of aluminium chloride forms and 0.90 g of aluminium is left",
        },
        {
          correct: false,
          label:
            "Aluminium is limiting; 13.4 g of aluminium chloride forms and no chlorine is left",
        },
        {
          correct: false,
          label:
            "Chlorine is limiting; 13.4 g of aluminium chloride forms and no aluminium is left",
        },
        {
          correct: false,
          label:
            "Chlorine is limiting; 8.9 g of aluminium chloride forms and 1.8 g of aluminium is left",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Klorin ialah bahan pengehad; 8.9 g aluminium klorida terbentuk dan 0.90 g aluminium berbaki",
        },
        {
          correct: false,
          label:
            "Aluminium ialah bahan pengehad; 13.4 g aluminium klorida terbentuk dan tiada klorin berbaki",
        },
        {
          correct: false,
          label:
            "Klorin ialah bahan pengehad; 13.4 g aluminium klorida terbentuk dan tiada aluminium berbaki",
        },
        {
          correct: false,
          label:
            "Klorin ialah bahan pengehad; 8.9 g aluminium klorida terbentuk dan 1.8 g aluminium berbaki",
        },
      ],
    },
  },
};

export default item;
