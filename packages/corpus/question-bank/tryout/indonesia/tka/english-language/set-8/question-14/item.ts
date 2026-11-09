import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "night-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The fisherman agreed to help because he was paid with the sack of rice.",
        },
        {
          correct: false,
          label:
            "The grandmother phoned the fisherman and asked him to take them across.",
        },
        {
          correct: true,
          label:
            "The deckhand who took the mangosteens is the one who asked his father to help them.",
        },
        {
          correct: false,
          label: "Rani missed her cousin's wedding because the ferry was full.",
        },
        {
          correct: false,
          label: "The ferry turned around and came back to pick them up.",
        },
      ],
    },
  },
};

export default item;
