import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "She loses interest after the boat trip and leaves the last houses for Laras to guess.",
        },
        {
          correct: true,
          label:
            "She moves from refusing to talk about the drowned village to drawing on the map herself and naming houses from the water.",
        },
        {
          correct: false,
          label:
            "She stays unwilling throughout and answers only because Laras asks one small question at a time.",
        },
        {
          correct: false,
          label:
            "She starts to help only after the heron calls her by her childhood name in August.",
        },
        {
          correct: false,
          label:
            "She comes to trust the map more than her own memory once the road line moves.",
        },
      ],
    },
  },
};

export default item;
