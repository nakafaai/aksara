import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Erasing “FINAL” and adding three questions changes the ledger from a display of certainty into a shared inquiry that the blank ending continues.",
        },
        {
          isCorrect: false,
          label:
            "The pencil marks establish the ledger's full meaning before Iris reads the unresolved costs or changes the page.",
        },
        {
          isCorrect: false,
          label:
            "The ending supplies the final supplier quote, making Iris's earlier questions unnecessary to the outcome.",
        },
        {
          isCorrect: false,
          label:
            "The empty hall changes the ledger's meaning by itself, independently of the erased word and the teammates' additions.",
        },
        {
          isCorrect: false,
          label:
            "The ledger remains a record of fixed totals even after its final claim is erased and its open questions receive deadlines.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
