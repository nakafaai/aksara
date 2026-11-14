import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "night-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rani and her grandmother carry a basket and a sack of rice.",
        },
        {
          correct: false,
          label: "The grandmother dozes against the side of the fishing boat.",
        },
        { correct: false, label: "They reach the island before midnight." },
        {
          correct: true,
          label:
            "The ferry is already full when Rani and her grandmother arrive.",
        },
        {
          correct: false,
          label: "Rani notices that the basket is two mangosteens lighter.",
        },
      ],
    },
  },
};

export default item;
