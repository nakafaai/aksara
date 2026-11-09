import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Defining *system alignment* proves that matching symbols alone caused every correctly sorted bag.",
        },
        {
          correct: false,
          label:
            "The definition makes evening-to-evening variation irrelevant to the follow-up.",
        },
        {
          correct: false,
          label:
            "The term *system alignment* replaces the measured comparison and consultation evidence.",
        },
        {
          correct: true,
          label:
            "The definition explains why permits and bins need the same symbols: the disposal decision begins at the stall and must remain consistent at collection.",
        },
        {
          correct: false,
          label:
            "The definition shows that correctly coloured bins are enough even when stall permits use different symbols.",
        },
      ],
    },
  },
};

export default item;
