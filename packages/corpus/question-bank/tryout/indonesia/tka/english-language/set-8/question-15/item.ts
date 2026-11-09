import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "night-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It is a fantasy, because the mangosteens have magic powers.",
        },
        {
          correct: false,
          label:
            "It is a fantasy, because a fishing boat cannot travel at night.",
        },
        {
          correct: false,
          label:
            "It is a legend, because it explains how Pulau Kecil got its name.",
        },
        {
          correct: false,
          label: "It is a fable, because the fisherman is really an animal.",
        },
        {
          correct: true,
          label:
            "It is realistic, because missing a ferry and getting help from a stranger's family could happen in real life.",
        },
      ],
    },
  },
};

export default item;
