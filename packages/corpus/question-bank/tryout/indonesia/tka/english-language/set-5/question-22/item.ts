import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "phone-free-lunch",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The number of students who talked with someone new rose from 18 to 39.",
        },
        {
          correct: false,
          label: "The number of students who felt rested rose from 46 to 71.",
        },
        {
          correct: false,
          label:
            "The student council asked 120 students about their afternoons.",
        },
        {
          correct: false,
          label: "Lunch break at the school lasts thirty minutes.",
        },
        {
          correct: false,
          label: "Students can still use a phone at the school office.",
        },
      ],
    },
  },
};

export default item;
