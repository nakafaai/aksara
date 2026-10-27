import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "rooftop-garden",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The western corner uses mesh to cool seedlings kept inside dark containers.",
        },
        {
          correct: true,
          label:
            "The eastern side uses shade cloth to protect seedlings during the brightest hours.",
        },
        {
          correct: false,
          label:
            "The stair area uses heavy planters to shade the herbs from afternoon light.",
        },
        {
          correct: false,
          label:
            "The work area uses the sealed notebook to reduce heat around seedlings.",
        },
        {
          correct: false,
          label:
            "The western corner moves flowering plants beneath bamboo frames whenever sunlight is strongest.",
        },
      ],
    },
  },
};

export default item;
