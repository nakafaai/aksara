import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every old packet contains a magical message.",
        },
        {
          isCorrect: false,
          label: "All seeds should be planted at once without a backup.",
        },
        {
          isCorrect: false,
          label: "Archive lists make experiments impossible.",
        },
        {
          isCorrect: false,
          label: "Students from different years cannot share one project.",
        },
        {
          isCorrect: true,
          label:
            "Check context before acting, and leave clear records for future participants.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
