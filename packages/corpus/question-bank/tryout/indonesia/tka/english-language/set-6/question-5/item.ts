import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "water-rota",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A $$1$$-cubic-metre tank that is empty can be filled in under an hour of supply.",
        },
        {
          correct: false,
          label:
            "Every block waits exactly four days between the end of one turn and the start of the next.",
        },
        {
          correct: false,
          label: "Most houses in Kampung Sumber have two tanks.",
        },
        {
          correct: true,
          label:
            "At Bu Narti's figure, one full $$1$$-cubic-metre tank lasts a household of five for more than three days.",
        },
        {
          correct: true,
          label: "Cart water costs $$\\text{Rp}250$$ a litre.",
        },
      ],
    },
  },
};

export default item;
