import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "walking-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer agrees that walking buses should stop for the whole rainy season.",
        },
        {
          correct: false,
          label:
            "The writer says that rain is not a real problem for a walking bus.",
        },
        {
          correct: false,
          label:
            "The writer suggests that the school buy raincoats for every student.",
        },
        {
          correct: true,
          label:
            "The writer admits that the rainy season is a problem but explains how the routes can adapt.",
        },
        {
          correct: false,
          label:
            "The writer reports that SD Lereng Asri cancelled its routes because of rain.",
        },
      ],
    },
  },
};

export default item;
