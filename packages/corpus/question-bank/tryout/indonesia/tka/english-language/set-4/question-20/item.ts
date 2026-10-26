import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "text-fit",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "If the foil tears or the hole becomes too large, replace the foil and try again.",
        },
        {
          correct: false,
          label:
            "Hold the foil up to the Sun and look through the hole to check that it is open.",
        },
        {
          correct: false,
          label:
            "Long ago, many people were frightened by eclipses and told stories to explain them.",
        },
        {
          correct: false,
          label:
            "Dark sunglasses are a good choice when you want to check the hole quickly.",
        },
        {
          correct: false,
          label:
            "I made my first projector last year, and it worked much better than I expected.",
        },
      ],
    },
  },
  stimulus: "pinhole-projector",
};

export default item;
