import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "bike-share",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "A $$40$$-minute pedal-bike ride that ends in a dock.",
        },
        {
          correct: false,
          label: "A $$40$$-minute e-bike ride that ends in a dock.",
        },
        {
          correct: true,
          label:
            "A $$44$$-minute pedal-bike ride to a full station, a press of the full-dock button, and $$12$$ more minutes to a free dock at the next station.",
        },
        {
          correct: false,
          label:
            "A $$30$$-minute pedal-bike ride after which the bike is left leaning against a full station.",
        },
        {
          correct: false,
          label: "A $$46$$-minute pedal-bike ride that ends in a dock.",
        },
      ],
    },
  },
};

export default item;
