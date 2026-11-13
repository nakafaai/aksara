import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "paraphrase",
  },
  stimulus: "ocean-acidification",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It turns some of the water's carbonate into bicarbonate, and scarcer carbonate raises the energy an animal must spend on building, even before shells start to dissolve.",
        },
        {
          correct: false,
          label:
            "The hydrogen ions it releases dissolve unprotected shell material, so animals must keep rebuilding what they lose.",
        },
        {
          correct: false,
          label:
            "It pushes the saturation state below $$1$$ every night in coastal water, when algae release carbon dioxide in darkness.",
        },
        {
          correct: false,
          label:
            "It turns the calcite in adult shells into aragonite, the form of calcium carbonate that dissolves more readily.",
        },
        {
          correct: false,
          label:
            "It forces larvae to switch from aragonite to calcite earlier than usual, and the early switch costs them energy.",
        },
      ],
    },
  },
};

export default item;
