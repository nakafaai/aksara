import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *metadata* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: true,
          label:
            "The definition explains why Theo's note about the uncertain date belongs to the photograph's record and supports later verification.",
        },
        {
          correct: false,
          label:
            "The definition reduces *metadata* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: false,
          label:
            "The term *metadata* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          correct: false,
          label:
            "The definition is included only to name the setting and has no connection to the character's decision.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
