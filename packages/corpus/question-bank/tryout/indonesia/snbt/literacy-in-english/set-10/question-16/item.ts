import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The ledger mainly establishes the hall as a realistic setting, while Iris's questions have little effect on its meaning.",
        },
        {
          correct: false,
          label:
            "Iris reaches a final budget decision, and that completed result removes the uncertainty attached to the ledger.",
        },
        {
          correct: false,
          label:
            "The open ending matters mainly because the supplier fails to respond, independently of Iris's changes to the ledger.",
        },
        {
          correct: false,
          label:
            "The teammates settle the conflict by adding deadlines, so the remaining blank line no longer carries interpretive weight.",
        },
        {
          correct: true,
          label:
            "Iris turns a ledger that displayed false certainty into a shared record of open questions, while the ending leaves the final budget unresolved.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
