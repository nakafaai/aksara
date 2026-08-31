import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Disappointment because the archive left several names unresolved",
        },
        {
          isCorrect: false,
          label:
            "Concern that stable identification numbers may separate photographs from personal memory",
        },
        {
          isCorrect: false,
          label:
            "Anger because the visitor's memory was treated as an object label",
        },
        {
          isCorrect: true,
          label:
            "Appreciation for careful records that show both evidence and limits",
        },
        {
          isCorrect: false,
          label:
            "Boredom because the week's work refined metadata instead of adding photographs",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
