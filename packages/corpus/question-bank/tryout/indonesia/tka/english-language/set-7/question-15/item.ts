import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "missing-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It is a fantasy, because a key cannot be kept inside a fridge.",
        },
        {
          correct: false,
          label:
            "It is a fantasy, because Dito knows where the key is by magic.",
        },
        {
          correct: false,
          label:
            "It is a fable, because it teaches a lesson through talking animals.",
        },
        {
          correct: true,
          label:
            "It is realistic, because putting a key away with the groceries could really happen.",
        },
        {
          correct: false,
          label:
            "It is a legend, because it explains how a family tradition began.",
        },
      ],
    },
  },
};

export default item;
