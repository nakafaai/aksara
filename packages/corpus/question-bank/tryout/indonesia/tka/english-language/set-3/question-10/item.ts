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
            "Disappointment because the archive invented every missing name",
        },
        {
          isCorrect: true,
          label:
            "Appreciation for careful records that show both evidence and limits",
        },
        {
          isCorrect: false,
          label: "Fear that stable numbers destroy photographs",
        },
        {
          isCorrect: false,
          label:
            "Anger because the visitor's memory was treated as an object label",
        },
        {
          isCorrect: false,
          label: "Boredom because no record changed during the week",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
