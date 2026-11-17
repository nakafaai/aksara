import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "At dusk the lamp is still off, and no change is needed",
        },
        {
          correct: false,
          label:
            "At dusk the lamp is already lit, and a $$12\\,\\Omega$$ resistor in series with the LDR keeps it off until full darkness",
        },
        {
          correct: false,
          label:
            "At dusk the lamp is already lit, and a $$60\\,\\Omega$$ resistor in parallel with the LDR keeps it off until full darkness",
        },
        {
          correct: true,
          label:
            "At dusk the lamp is already lit, and a $$12\\,\\Omega$$ resistor in parallel with the LDR keeps it off until full darkness",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pada waktu senja lampu masih padam, dan tiada perubahan diperlukan",
        },
        {
          correct: false,
          label:
            "Pada waktu senja lampu sudah menyala, dan perintang $$12\\,\\Omega$$ bersiri dengan PPC memastikannya padam sehingga gelap sepenuhnya",
        },
        {
          correct: false,
          label:
            "Pada waktu senja lampu sudah menyala, dan perintang $$60\\,\\Omega$$ selari dengan PPC memastikannya padam sehingga gelap sepenuhnya",
        },
        {
          correct: true,
          label:
            "Pada waktu senja lampu sudah menyala, dan perintang $$12\\,\\Omega$$ selari dengan PPC memastikannya padam sehingga gelap sepenuhnya",
        },
      ],
    },
  },
};

export default item;
