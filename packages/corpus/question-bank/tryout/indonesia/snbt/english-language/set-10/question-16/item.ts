import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The ledger mainly establishes the hall as a realistic setting, while Iris's questions have little effect on its meaning.",
        },
        {
          isCorrect: false,
          label:
            "Iris reaches a final budget decision, and that completed result removes the uncertainty attached to the ledger.",
        },
        {
          isCorrect: false,
          label:
            "The open ending matters mainly because the supplier fails to respond, independently of Iris's changes to the ledger.",
        },
        {
          isCorrect: false,
          label:
            "The teammates settle the conflict by adding deadlines, so the remaining blank line no longer carries interpretive weight.",
        },
        {
          isCorrect: true,
          label:
            "Iris turns a ledger that displayed false certainty into a shared record of open questions, while the ending leaves the final budget unresolved.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
