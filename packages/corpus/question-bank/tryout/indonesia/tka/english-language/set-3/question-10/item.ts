import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Disappointment because the archive left several names unresolved",
        },
        {
          correct: false,
          label:
            "Concern that stable identification numbers may separate photographs from personal memory",
        },
        {
          correct: false,
          label:
            "Anger because the visitor's memory was treated as an object label",
        },
        {
          correct: true,
          label:
            "Appreciation for careful records that show both evidence and limits",
        },
        {
          correct: false,
          label:
            "Boredom because the week's work refined metadata instead of adding photographs",
        },
      ],
    },
  },
  stimulus: "archive-week",
};

export default item;
