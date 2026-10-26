import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A ledger passed between student treasurers",
        },
        {
          correct: true,
          label: "The blank line after the balanced total",
        },
        {
          correct: false,
          label: "The supplier reply that settled the concert budget",
        },
        {
          correct: false,
          label: "Why every budget needs one final number",
        },
        {
          correct: false,
          label: "A morning meeting with no unanswered questions",
        },
      ],
    },
  },
};

export default item;
