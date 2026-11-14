import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "coding-club",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer says that screen time is never harmful for children.",
        },
        {
          correct: false,
          label: "The writer asks parents to buy computers for their children.",
        },
        {
          correct: true,
          label:
            "The writer accepts parents' worry about screen time, points to the short and partly offline sessions, and suggests a trial semester.",
        },
        {
          correct: false,
          label: "The writer reports new attendance figures from the trial.",
        },
        {
          correct: false,
          label:
            "The writer suggests that the club meet every day after school.",
        },
      ],
    },
  },
};

export default item;
