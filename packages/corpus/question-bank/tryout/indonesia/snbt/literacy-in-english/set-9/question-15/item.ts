import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "recycling-rate",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Asking residents to put many more mixed food trays into their recycling bins",
        },
        {
          correct: false,
          label: "Reporting the share of waste that goes into bins more often",
        },
        {
          correct: false,
          label: "Sending all sorting plant rejects to a larger landfill site",
        },
        {
          correct: false,
          label: "Counting glass by volume instead of by weight in the report",
        },
        {
          correct: true,
          label:
            "Persuading residents to keep paper dry and free of food before binning it",
        },
      ],
    },
  },
};

export default item;
