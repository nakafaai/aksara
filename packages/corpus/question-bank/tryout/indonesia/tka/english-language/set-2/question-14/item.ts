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
          label: "He believes printed schedules show every live delay.",
        },
        {
          isCorrect: false,
          label: "He refuses to use the service page again.",
        },
        {
          isCorrect: false,
          label: "He plans to remove all phone numbers.",
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
