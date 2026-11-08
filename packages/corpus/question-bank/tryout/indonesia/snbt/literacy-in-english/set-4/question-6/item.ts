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
            "A fee alone will not cut crowds, so it should support a cap on numbers.",
        },
        {
          correct: false,
          label:
            "Cities should ban day visitors entirely to protect the daily lives of residents.",
        },
        {
          correct: false,
          label:
            "Entry fees should keep rising until crowds fall to a level the city can bear.",
        },
        {
          correct: false,
          label:
            "Venice's fee has already solved its overtourism problem and should be copied.",
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
