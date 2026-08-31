import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "He expects a printed schedule to remain the most precise source during a disruption.",
        },
        {
          isCorrect: false,
          label: "He refuses to use the service page again.",
        },
        {
          isCorrect: false,
          label:
            "He decides that service pages make direct phone contact unnecessary.",
        },
        {
          isCorrect: true,
          label:
            "He learns to combine sources rather than reject an imperfect one.",
        },
        {
          isCorrect: false,
          label: "He thinks the storm did not affect transport.",
        },
      ],
    },
  },
  stimulusKey: "last-bus",
};

export default item;
