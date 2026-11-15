import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "solar-heat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "July's efficiency was about $$19\\%$$, the same as March's, so July's high output does show that heat did no harm.",
        },
        {
          correct: false,
          label:
            "July's efficiency was about $$17.5\\%$$, higher than June's, so heat began to help once the panels passed $$40$$ °C.",
        },
        {
          correct: true,
          label:
            "July's efficiency was about $$16.5\\%$$, the lowest of the six months, so its high output came from having the most sunlight.",
        },
        {
          correct: false,
          label:
            "July's efficiency was about $$16.5\\%$$, the lowest of the six months, which proves that heat alone caused the loss.",
        },
        {
          correct: false,
          label:
            "June's efficiency was the lowest of the six months, so June, not July, is the month that shows the harm from heat.",
        },
      ],
    },
  },
};

export default item;
