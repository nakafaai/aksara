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
            "The term *systems thinking* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: false,
          label:
            "The definition reduces *systems thinking* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: true,
          label:
            "The definition explains why Hana follows the bag across steps: the visible error at the bin may be produced by an earlier connection in the process.",
        },
        {
          correct: false,
          label:
            "The term *systems thinking* describes the final outcome as certain, even though the narrative presents a gradual change.",
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
