import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "weather-notebook",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The notebook is damaged by an ordinary cause, and the characters recover only the evidence still available.",
        },
        {
          correct: false,
          label:
            "The story is realistic because the surviving plants reveal the exact rainfall data missing from the notebook.",
        },
        {
          correct: false,
          label:
            "The story becomes unrealistic because wet pages cannot be dried or photographed.",
        },
        {
          correct: false,
          label:
            "The digital copy restores every blurred record, so the accident causes no loss of evidence.",
        },
        {
          correct: false,
          label:
            "Mina's final observation turns the notebook into a character that can judge her accusation.",
        },
      ],
    },
  },
};

export default item;
