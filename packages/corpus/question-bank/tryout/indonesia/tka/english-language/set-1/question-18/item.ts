import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Why Glasswort Swells After Every Flood",
        },
        {
          correct: true,
          label:
            "Three Marshes on One Short Walk: How the Tide Shapes What Grows",
        },
        {
          correct: false,
          label: "The Saltiest Place on the Coast",
        },
        {
          correct: false,
          label: "How to Read the Tide from a Line of Dried Seaweed",
        },
        {
          correct: false,
          label: "Plants That Keep Salt Out of Their Roots",
        },
      ],
    },
  },
};

export default item;
