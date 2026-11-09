import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "class-cleaning",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "to describe how to sweep a classroom properly",
        },
        {
          correct: false,
          label: "to report how long each cleaning task takes",
        },
        {
          correct: false,
          label: "to persuade parents to clean the school toilets",
        },
        {
          correct: false,
          label: "to argue that the school should dismiss its cleaners",
        },
        {
          correct: true,
          label:
            "to argue that the school should keep student cleaning duty in the classroom",
        },
      ],
    },
  },
};

export default item;
