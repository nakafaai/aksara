import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *irony* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          correct: false,
          label:
            "The definition treats *irony* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          correct: false,
          label:
            "The term *irony* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          correct: true,
          label:
            "The definition of *irony* clarifies the contrast between an accurate board that misdirects passengers and the same information becoming useful after a simple rotation.",
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
