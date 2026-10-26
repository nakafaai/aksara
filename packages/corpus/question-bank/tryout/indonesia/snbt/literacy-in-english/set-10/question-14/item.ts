import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The term proves that Caleb's original balanced total was reliable before the quotes were checked.",
        },
        {
          correct: true,
          label:
            "The definition explains why the added line is tied to identified security and lighting risks rather than being an arbitrary extra amount.",
        },
        {
          correct: false,
          label:
            "The definition turns contingency into another name for every unconfirmed price in the spreadsheet.",
        },
        {
          correct: false,
          label:
            "The term guarantees that no cost can threaten the deposit once a contingency line appears.",
        },
        {
          correct: false,
          label:
            "The definition describes the concert setting but does not help explain Caleb's scenarios or assigned follow-up.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
