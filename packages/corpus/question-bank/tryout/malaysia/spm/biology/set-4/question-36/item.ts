import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nutrition-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Chlorophyll b, and the seaweed holds a pigment that the leaf does not have",
        },
        {
          correct: true,
          label:
            "Chlorophyll a, and the seaweed holds a pigment that the leaf does not have",
        },
        {
          correct: false,
          label:
            "Chlorophyll a, and the spot at $$20\\text{ mm}$$ is chlorophyll b that travelled less far",
        },
        {
          correct: false,
          label:
            "Xanthophyll, and the seaweed holds a pigment that the leaf does not have",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Klorofil b, dan rumpai laut mengandungi pigmen yang tiada pada daun",
        },
        {
          correct: true,
          label:
            "Klorofil a, dan rumpai laut mengandungi pigmen yang tiada pada daun",
        },
        {
          correct: false,
          label:
            "Klorofil a, dan tompok pada $$20\\text{ mm}$$ ialah klorofil b yang bergerak kurang jauh",
        },
        {
          correct: false,
          label:
            "Xantofil, dan rumpai laut mengandungi pigmen yang tiada pada daun",
        },
      ],
    },
  },
};

export default item;
