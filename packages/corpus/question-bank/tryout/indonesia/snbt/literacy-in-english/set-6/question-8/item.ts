import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "grading-curve",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To show that a curve can give low marks to students who have learned well",
        },
        {
          correct: false,
          label:
            "To argue that strong students should be placed in separate, faster classes",
        },
        {
          correct: false,
          label:
            "To show that strong classes usually cheat to raise their marks",
        },
        {
          correct: false,
          label:
            "To prove that every student in a strong class will receive an A",
        },
        {
          correct: false,
          label:
            "To suggest that a teacher's own standards might be too strict",
        },
      ],
    },
  },
};

export default item;
