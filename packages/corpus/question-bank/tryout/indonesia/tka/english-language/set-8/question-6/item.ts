import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "science-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A group proves that aluminum foil is the best material for keeping things cold.",
        },
        {
          correct: true,
          label:
            "A group tests which material keeps ice frozen longest, finds that wool works best, and explains why at the science fair.",
        },
        {
          correct: false,
          label:
            "Visitors at a science fair teach a group that wool makes things warm.",
        },
        {
          correct: false,
          label:
            "The judges award first place to a group that studied melting ice.",
        },
        {
          correct: false,
          label: "Students learn how cooler bags are made in a factory.",
        },
      ],
    },
  },
};

export default item;
