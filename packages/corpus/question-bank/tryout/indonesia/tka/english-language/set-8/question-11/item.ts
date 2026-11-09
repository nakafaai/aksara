import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "night-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "She argues with the deckhand to get onto the ferry.",
        },
        { correct: true, label: "She stays calm when her plans go wrong." },
        {
          correct: false,
          label: "She phones the fisherman to ask for a ride.",
        },
        {
          correct: true,
          label: "She is generous even toward people she does not know well.",
        },
      ],
    },
  },
};

export default item;
