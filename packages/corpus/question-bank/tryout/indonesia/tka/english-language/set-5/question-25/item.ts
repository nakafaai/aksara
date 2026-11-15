import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "bag-fee",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "During the trial, the charging stalls handed out $$2{,}800$$ fewer bags a week than before.",
        },
        {
          column: 2,
          label:
            "Across all sixty stalls, the number of bags handed out fell by more than half.",
        },
        {
          column: 2,
          label:
            "Bag use fell by a larger share at the stalls without the charge than at the charging stalls.",
        },
        {
          column: 1,
          label:
            "Before the trial, a stall with the charge and a stall without it handed out the same number of bags on average.",
        },
        {
          column: 1,
          label:
            "During the trial, the forty stalls without the charge handed out more than six times as many bags as the charging stalls.",
        },
      ],
    },
  },
};

export default item;
