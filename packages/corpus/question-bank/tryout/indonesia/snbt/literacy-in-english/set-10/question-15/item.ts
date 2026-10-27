import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Turning uncertain quotes into a workable concert budget",
        },
        {
          correct: false,
          label: "Waiting for every price before making a decision",
        },
        {
          correct: false,
          label: "A balanced total with no unanswered questions",
        },
        {
          correct: false,
          label: "Why contingency means adding money without a reason",
        },
        {
          correct: false,
          label: "Removing projection equipment from every youth concert",
        },
      ],
    },
  },
};

export default item;
