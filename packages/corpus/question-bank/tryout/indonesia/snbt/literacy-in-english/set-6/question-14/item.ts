import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "water-meters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Installing smart meters in Area C as well, starting halfway through the trial",
        },
        {
          correct: false,
          label:
            "Asking households in Areas A and B whether they liked the app",
        },
        {
          correct: false,
          label:
            "Reading the ordinary meters in Areas C and D once a year instead",
        },
        {
          correct: false,
          label:
            "Raising water prices in all four areas during the second summer",
        },
        {
          correct: true,
          label:
            "Choosing at random which similar areas receive meters, not by application",
        },
      ],
    },
  },
};

export default item;
