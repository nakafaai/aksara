import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A recurring object that remains part of the setting",
        },
        {
          correct: true,
          label: "Cutting a warning down to action",
        },
        {
          correct: false,
          label: "A conflict settled before the character's final choice",
        },
        {
          correct: false,
          label: "Narrative conflict as a term without a role in the story",
        },
        {
          correct: false,
          label: "An ending that removes the object's interpretive tension",
        },
      ],
    },
  },
};

export default item;
