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
            "The term *cognitive load* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: false,
          label:
            "The definition reduces *cognitive load* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: false,
          label:
            "The term *cognitive load* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          correct: true,
          label:
            "The definition explains why removing nonessential detail can make the safe route easier to locate: the reader has less information to hold and process at once.",
        },
        {
          correct: false,
          label:
            "The definition is included only to name the setting and has no connection to the character's decision.",
        },
      ],
    },
  },
};

export default item;
