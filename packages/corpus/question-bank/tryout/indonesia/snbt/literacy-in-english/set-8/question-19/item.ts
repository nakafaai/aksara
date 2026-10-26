import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *metaphor* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          correct: false,
          label:
            "The definition treats *metaphor* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          correct: false,
          label:
            "The term *metaphor* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          correct: true,
          label:
            "The definition explains the card-as-doorway comparison: turning the card becomes a way of moving between relationships through language.",
        },
        {
          correct: false,
          label:
            "The definition explains only the setting, so the recurring object and the character's action are irrelevant.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
