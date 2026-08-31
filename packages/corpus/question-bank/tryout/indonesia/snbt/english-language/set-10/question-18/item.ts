import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The ledger gains meaning primarily from its worn cover, regardless of the crossed-out totals and unanswered questions.",
        },
        {
          isCorrect: false,
          label:
            "The morning setting resolves the budget because the added initials are equivalent to confirmed prices.",
        },
        {
          isCorrect: false,
          label:
            "The ledger keeps the same meaning as a final record even after Iris changes how the team uses it.",
        },
        {
          isCorrect: false,
          label:
            "The blank final line confirms that the original balanced total was accurate despite the unresolved costs.",
        },
        {
          isCorrect: true,
          label:
            "The ledger's meaning shifts through the false final total, Iris's questions, the teammates' deadlines, and the unresolved last line.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
