import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *self-efficacy* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: false,
          label:
            "The definition reduces *self-efficacy* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: false,
          label:
            "The term *self-efficacy* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          correct: true,
          label:
            "The definition of *self-efficacy* provides a lens for reading the character's specific choice as a response to uncertainty, not as an isolated moral label.",
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
