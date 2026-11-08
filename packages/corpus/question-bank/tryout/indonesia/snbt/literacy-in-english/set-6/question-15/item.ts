import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "water-meters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Use fell more where meters were installed, but how much the meters caused is unclear.",
        },
        {
          correct: false,
          label:
            "Smart meters cut water use by exactly 15 percent in every area where they are used.",
        },
        {
          correct: false,
          label:
            "Ordinary meters increase water use because they are read only once every three months.",
        },
        {
          correct: false,
          label:
            "The fall in Area A was caused entirely by the council's leak repair programme.",
        },
        {
          correct: false,
          label:
            "Residents of Areas C and D probably wasted more water than residents of A and B.",
        },
      ],
    },
  },
};

export default item;
