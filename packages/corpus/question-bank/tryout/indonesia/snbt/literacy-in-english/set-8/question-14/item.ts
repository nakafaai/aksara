import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *connotation* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: false,
          label:
            "The definition reduces *connotation* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: false,
          label:
            "The term *connotation* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          correct: false,
          label:
            "The definition is included only to name the setting and has no connection to the character's decision.",
        },
        {
          correct: true,
          label:
            "The definition explains why two literal equivalents can suit different settings: each carries a social meaning and level of formality beyond its basic reference.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
