import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Visitors copy them onto the painted board beside the door.",
        },
        {
          correct: false,
          label: "A ranger reads them aloud to visitors on the upper platform.",
        },
        {
          correct: false,
          label:
            "Visitors check them against the bird outlines before they leave.",
        },
        {
          correct: false,
          label:
            "A ranger copies them into the reserve's records every evening.",
        },
        {
          correct: true,
          label: "A ranger adds them to the reserve's records once a week.",
        },
      ],
    },
  },
  stimulus: "egret-hide",
};

export default item;
