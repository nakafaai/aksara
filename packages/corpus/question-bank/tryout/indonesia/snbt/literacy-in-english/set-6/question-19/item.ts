import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The definition explains how visual details such as the gold seam and its thin line of light make the repair's changed meaning perceptible.",
        },
        {
          correct: false,
          label:
            "The term *sensory imagery* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          correct: false,
          label:
            "The definition treats *sensory imagery* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          correct: false,
          label:
            "The term *sensory imagery* makes the reader's personal impression sufficient even when it conflicts with story details.",
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
