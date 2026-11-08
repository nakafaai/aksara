import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "deep-vents",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Some sunlight reaches the vents through very clear water.",
        },
        {
          correct: false,
          label: "The tube worms rise to the surface at night to feed.",
        },
        {
          correct: false,
          label:
            "The heat of the vent fluid comes from the sun's warming of the ocean.",
        },
        {
          correct: false,
          label:
            "Vent bacteria use sugars that sink down from plants at the surface.",
        },
        {
          correct: true,
          label:
            "Most vent bacteria need oxygen that exists because of surface photosynthesis.",
        },
      ],
    },
  },
};

export default item;
