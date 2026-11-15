import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "solar-hall",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "On an overcast day, the panels produce less than half of what they produce on a clear day.",
        },
        {
          correct: true,
          label:
            "Starting full, with everything else switched off (the refrigerator too), the battery can run the fans for $$20$$ hours before the hall switches to the grid.",
        },
        {
          correct: false,
          label: "The panels will have paid for themselves within eight years.",
        },
        {
          correct: true,
          label:
            "In one day, the refrigerator uses more energy than the projector uses on a typical event evening.",
        },
        {
          correct: false,
          label:
            "The hall bought more than $$300$$ kWh from the grid in the rainy months last year.",
        },
      ],
    },
  },
};

export default item;
