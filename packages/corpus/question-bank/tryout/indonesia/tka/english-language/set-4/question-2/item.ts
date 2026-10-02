import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Visitors copy them onto the painted board beside the door.",
        },
        {
          isCorrect: false,
          label: "A ranger reads them aloud to visitors on the upper platform.",
        },
        {
          isCorrect: false,
          label:
            "Visitors check them against the bird outlines before they leave.",
        },
        {
          isCorrect: false,
          label:
            "A ranger copies them into the reserve's records every evening.",
        },
        {
          isCorrect: true,
          label: "A ranger adds them to the reserve's records once a week.",
        },
      ],
    },
  },
  stimulusKey: "egret-hide",
};

export default item;
