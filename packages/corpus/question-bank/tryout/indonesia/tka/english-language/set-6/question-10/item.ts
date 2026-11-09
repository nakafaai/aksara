import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "beach-cleanup",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“Beach cleanups are useless because the rubbish just keeps coming back.”",
        },
        {
          correct: false,
          label:
            "“Tourists should be banned from Pantai Kuta Baru to keep it clean.”",
        },
        {
          correct: false,
          label:
            "“Bottles must be the biggest problem on every beach in Indonesia.”",
        },
        {
          correct: true,
          label:
            "“Reducing waste in the towns along the river may matter as much as cleaning the beach.”",
        },
        {
          correct: false,
          label:
            "“The scouts should stop recording data because counting takes too long.”",
        },
      ],
    },
  },
};

export default item;
