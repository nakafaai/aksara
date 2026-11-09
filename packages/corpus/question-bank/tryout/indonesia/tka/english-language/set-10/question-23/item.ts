import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "coding-club",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A regular club would certainly have more students than the trial did.",
        },
        {
          correct: true,
          label: "Attendance fell by 5 students between week 1 and week 6.",
        },
        {
          correct: false,
          label: "The trial was held during the rainy season.",
        },
        {
          correct: true,
          label:
            "Most of the students who signed up were still attending at the end.",
        },
      ],
    },
  },
};

export default item;
