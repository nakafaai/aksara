import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "stage-lines",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Maya practices her lines every night for a month.",
        },
        {
          correct: true,
          label:
            "Maya answers Tomi's made-up question, and the rest of her speech comes back.",
        },
        {
          correct: false,
          label: "Maya forgets her first line in front of a full hall.",
        },
        {
          correct: false,
          label: "Somebody in the audience coughs during the silence.",
        },
        {
          correct: false,
          label: "Maya stands behind the curtain, repeating her first line.",
        },
      ],
    },
  },
};

export default item;
