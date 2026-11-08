import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "visitor-fee",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A small fee alone will not reduce crowds, so it should support a system that limits numbers.",
        },
        {
          correct: false,
          label:
            "Cities should ban day visitors entirely in order to protect residents.",
        },
        {
          correct: false,
          label:
            "Entry fees should be raised until crowds fall to a level the city can bear.",
        },
        {
          correct: false,
          label:
            "Venice's fee has already solved its problem with overtourism.",
        },
        {
          correct: false,
          label:
            "Tourism brings so little money that fees are the only way to fund city services.",
        },
      ],
    },
  },
};

export default item;
