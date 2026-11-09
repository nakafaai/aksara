import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "scooter-pilot",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The share of trips taken at night in each month of the pilot",
        },
        {
          correct: true,
          label:
            "Injuries treated at private clinics and hospitals during the pilot",
        },
        {
          correct: false,
          label:
            "The number of parking spots that the operator marked across the city each month",
        },
        {
          correct: false,
          label: "The number of riders who wore helmets in each month",
        },
        {
          correct: false,
          label: "The price that riders paid to unlock a scooter for one trip",
        },
      ],
    },
  },
};

export default item;
