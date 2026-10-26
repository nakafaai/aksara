import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *tone* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          correct: false,
          label:
            "The definition treats *tone* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          correct: false,
          label:
            "The term *tone* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          correct: true,
          label:
            "The definition of *tone* explains how Eli's direct invitation shifts the display's attitude from distant expertise toward welcoming curiosity.",
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
