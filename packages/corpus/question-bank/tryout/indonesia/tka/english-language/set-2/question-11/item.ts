import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "last-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "He expects a printed schedule to remain the most precise source during a disruption.",
        },
        {
          correct: false,
          label: "He refuses to use the service page again.",
        },
        {
          correct: false,
          label:
            "He decides that service pages make direct phone contact unnecessary.",
        },
        {
          correct: true,
          label:
            "He learns to combine sources rather than reject an imperfect one.",
        },
        {
          correct: false,
          label: "He thinks the storm did not affect transport.",
        },
      ],
    },
  },
};

export default item;
