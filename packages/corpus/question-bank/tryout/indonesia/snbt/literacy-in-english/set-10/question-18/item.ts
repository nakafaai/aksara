import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The ledger gains meaning primarily from its worn cover, regardless of the crossed-out totals and unanswered questions.",
        },
        {
          correct: false,
          label:
            "The morning setting resolves the budget because the added initials are equivalent to confirmed prices.",
        },
        {
          correct: false,
          label:
            "The ledger keeps the same meaning as a final record even after Iris changes how the team uses it.",
        },
        {
          correct: false,
          label:
            "The blank final line confirms that the original balanced total was accurate despite the unresolved costs.",
        },
        {
          correct: true,
          label:
            "The ledger's meaning shifts through its premature claim of finality, Iris's questions, the teammates' deadlines, and the unresolved last line.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
