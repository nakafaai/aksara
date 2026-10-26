import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term *psychological safety* proves that the character's first estimate was correct before any accountable action was taken.",
        },
        {
          correct: false,
          label:
            "The definition reduces *psychological safety* to the recurring object, so the character's choice and development no longer matter.",
        },
        {
          correct: false,
          label:
            "The term *psychological safety* describes the final outcome as certain, even though the narrative presents a gradual change.",
        },
        {
          correct: true,
          label:
            "The definition clarifies why inviting each member to voice a concern changes the group's decision process: it creates room to raise problems without humiliation.",
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
