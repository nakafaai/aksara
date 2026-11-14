import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "coding-club",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "to persuade the school to start a weekly coding club",
        },
        {
          correct: false,
          label: "to describe the clubs that the school already offers",
        },
        {
          correct: false,
          label: "to report how many students attended the trial each week",
        },
        { correct: false, label: "to explain how to write a computer program" },
        {
          correct: false,
          label: "to argue that students should spend more time on screens",
        },
      ],
    },
  },
};

export default item;
