import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *motif* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          correct: false,
          label:
            "The definition treats *motif* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          correct: false,
          label:
            "The term *motif* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          correct: true,
          label:
            "The definition of *motif* identifies how the recurring stamp links the missing package date, Samira's action, and the next volunteer's response into one idea.",
        },
        {
          correct: false,
          label:
            "The definition explains only the setting, so the recurring object and the character's action are irrelevant.",
        },
      ],
    },
  },
};

export default item;
