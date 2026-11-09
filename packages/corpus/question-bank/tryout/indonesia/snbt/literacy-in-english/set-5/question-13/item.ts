import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Progress depends on completing the larger task before asking another person to review it.",
        },
        {
          correct: false,
          label:
            "The object or setting shapes the outcome more strongly than the character's specific choice.",
        },
        {
          correct: true,
          label:
            "Mina's progress began when the difficulty was turned into a specific, reviewable action.",
        },
        {
          correct: false,
          label:
            "The unresolved evidence should remain private until the character can offer a complete result.",
        },
        {
          correct: false,
          label:
            "The small action matters mainly because it postpones the unresolved part of the conflict.",
        },
      ],
    },
  },
};

export default item;
