import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "From a blank caption to an invitation to look",
        },
        {
          correct: false,
          label: "A recurring object that remains part of the setting",
        },
        {
          correct: false,
          label: "A conflict settled before the character's final choice",
        },
        {
          correct: false,
          label: "Tone as a term without a role in the story",
        },
        {
          correct: false,
          label: "An ending that removes the object's interpretive tension",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
