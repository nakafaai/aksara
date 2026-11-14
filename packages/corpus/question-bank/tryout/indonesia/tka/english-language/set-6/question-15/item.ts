import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "stage-lines",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It is a fantasy, because the river in the play rises by itself.",
        },
        {
          correct: false,
          label:
            "It is a fantasy, because words cannot really disappear from someone's mind.",
        },
        {
          correct: true,
          label:
            "It is realistic, because an actor forgetting lines and another actor improvising could really happen.",
        },
        {
          correct: false,
          label:
            "It is a legend, because it explains how a flood began in a village.",
        },
        {
          correct: false,
          label:
            "It is a fable, because its characters are animals that can talk.",
        },
      ],
    },
  },
};

export default item;
