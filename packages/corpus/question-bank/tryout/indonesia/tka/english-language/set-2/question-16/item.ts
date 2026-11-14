import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "umbrella",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The bent rib is straight again when Pak Darmo opens the umbrella, although nobody has touched it.",
        },
        {
          correct: false,
          label:
            "The umbrella is hooked over Bu Sari's cart, although she is sure it was not there when she set out.",
        },
        {
          correct: false,
          label:
            "Raka finds the umbrella already open at the shelter, with nobody standing near it.",
        },
        {
          correct: false,
          label:
            "A gust of wind on the bridge bends one rib of the umbrella backwards.",
        },
        {
          correct: false,
          label:
            "Wulan's own umbrella blows inside out in the heaviest rain of the week.",
        },
      ],
    },
  },
};

export default item;
