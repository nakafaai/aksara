import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "bus-shelters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The writer admits that shelters might attract litter but suggests bins and help from schools.",
        },
        {
          correct: false,
          label:
            "The writer says that litter would not be a real problem at the shelters.",
        },
        {
          correct: false,
          label: "The writer asks local schools to pay for the new shelters.",
        },
        {
          correct: false,
          label:
            "The writer reports that graffiti has already appeared at the market stop.",
        },
        {
          correct: false,
          label: "The writer suggests removing all bins from the bus stops.",
        },
      ],
    },
  },
};

export default item;
