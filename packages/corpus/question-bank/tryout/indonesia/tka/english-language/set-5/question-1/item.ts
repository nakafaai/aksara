import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "night-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "why food at the night market is cheaper than food at the day market",
        },
        {
          correct: true,
          label: "how a car park is arranged and used as a weekly night market",
        },
        {
          correct: false,
          label: "how the Lantern Night Market first began in the district",
        },
        {
          correct: false,
          label: "how to rent a table and open a stall at the night market",
        },
        {
          correct: false,
          label: "a performance given by local students on a wooden stage",
        },
      ],
    },
  },
};

export default item;
