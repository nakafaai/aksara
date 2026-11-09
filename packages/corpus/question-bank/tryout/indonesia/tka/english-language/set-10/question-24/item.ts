import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "coding-club",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Students must break a big problem into small steps.",
        },
        {
          correct: false,
          label:
            "Free beginner programs run on the school's existing computers.",
        },
        {
          correct: false,
          label: "The club would meet for only ninety minutes a week.",
        },
        {
          correct: false,
          label:
            "The school already offers football, music, and journalism clubs.",
        },
        {
          correct: true,
          label:
            "Thirty-two students signed up for the trial when the teacher expected about fifteen.",
        },
      ],
    },
  },
};

export default item;
