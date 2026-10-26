import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *co-design* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: false,
          label:
            "The definition reduces *co-design* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: true,
          label:
            "The definition of *co-design* explains why Amina's participation in testing and revising the map is part of the design process rather than an afterthought.",
        },
        {
          correct: false,
          label:
            "The term *co-design* describes the final outcome as certain, even though the narrative presents a gradual change.",
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
