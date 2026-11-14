import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "bus-shelters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Only three of the fourteen stops on the main route have a roof.",
        },
        {
          correct: false,
          label: "Many older passengers stay home during the rainy season.",
        },
        {
          correct: true,
          label:
            "Boardings at the market stop rose from about 210 to about 260 a day after it got a roof.",
        },
        {
          correct: false,
          label:
            "A simple steel shelter with a bench costs about 25 million rupiah.",
        },
        {
          correct: false,
          label: "Local schools have offered to adopt a shelter.",
        },
      ],
    },
  },
};

export default item;
