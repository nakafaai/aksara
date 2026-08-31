import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term proves that Caleb's original balanced total was reliable before the quotes were checked.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why the added line is tied to identified security and lighting risks rather than being an arbitrary extra amount.",
        },
        {
          isCorrect: false,
          label:
            "The definition turns contingency into another name for every unconfirmed price in the spreadsheet.",
        },
        {
          isCorrect: false,
          label:
            "The term guarantees that no cost can threaten the deposit once a contingency line appears.",
        },
        {
          isCorrect: false,
          label:
            "The definition describes the concert setting but does not help explain Caleb's scenarios or assigned follow-up.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
