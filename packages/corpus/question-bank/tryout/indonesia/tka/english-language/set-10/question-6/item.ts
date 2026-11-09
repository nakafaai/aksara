import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "flood-kitchen",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A coordinator explains to volunteers why floods happen in the village.",
        },
        {
          correct: false,
          label:
            "Families refuse the food because the water is still knee-deep.",
        },
        {
          correct: false,
          label:
            "The writer cooks rice in huge pots for four hundred families.",
        },
        {
          correct: true,
          label:
            "Two siblings volunteer during a flood, first in an emergency kitchen and then cleaning houses, and the writer learns how much planning aid needs.",
        },
        {
          correct: false,
          label:
            "A motorbike team rescues families who are trapped by the river.",
        },
      ],
    },
  },
};

export default item;
