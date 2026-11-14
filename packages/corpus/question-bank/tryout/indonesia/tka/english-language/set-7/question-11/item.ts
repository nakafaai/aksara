import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "missing-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "stubborn, because she refuses to thank Dito",
        },
        {
          correct: false,
          label: "careless, because she loses the key again in the morning",
        },
        {
          correct: true,
          label:
            "fair, because she admits that Dito was right and shares her chocolate with him",
        },
        {
          correct: false,
          label: "fearful, because she is afraid of missing the bus",
        },
        {
          correct: false,
          label: "jealous, because Dito found the key before she did",
        },
      ],
    },
  },
};

export default item;
