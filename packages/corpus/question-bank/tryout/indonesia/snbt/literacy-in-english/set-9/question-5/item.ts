import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "tambora-1816",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To prove that the eruption was felt mostly by writers and artists in Europe",
        },
        {
          correct: false,
          label: "To argue that bad weather always produces better literature",
        },
        {
          correct: true,
          label:
            "To show that the eruption's effects reached even into cultural life",
        },
        {
          correct: false,
          label:
            "To explain how Mary Shelley learned about volcanoes in Indonesia",
        },
        {
          correct: false,
          label:
            "To suggest that the ghost-story contest caused food prices to rise",
        },
      ],
    },
  },
};

export default item;
