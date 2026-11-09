import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "water-filter",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "to keep the charcoal and sand from falling through the holes in the cap",
        },
        {
          correct: false,
          label: "to remove germs so that the water becomes safe to drink",
        },
        {
          correct: false,
          label: "to make the water flow through the bottle more quickly",
        },
        {
          correct: false,
          label: "to stop the top part of the bottle from tipping over",
        },
        { correct: false, label: "to give the filtered water a cleaner color" },
      ],
    },
  },
};

export default item;
