import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "ocean-acidification",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The generous feeding of the animals and the lack of time for populations to adapt over generations",
        },
        {
          correct: false,
          label:
            "The abrupt rise in carbon dioxide and the steady level at which the tank is then held",
        },
        {
          correct: false,
          label:
            "The abrupt rise in carbon dioxide and the testing of one factor at a time",
        },
        {
          correct: true,
          label:
            "The generous feeding of the animals and the steady level at which the tank is then held",
        },
        {
          correct: false,
          label:
            "The testing of one factor at a time and the drifting in of larvae from normal water",
        },
      ],
    },
  },
};

export default item;
