import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The definition explains why entry-date labels matter: they help volunteers identify which suitable packages should be used first.",
        },
        {
          isCorrect: false,
          label:
            "Defining *stock rotation* proves that the labels alone caused the trial value of 47.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes changes in package demand irrelevant to any later decision.",
        },
        {
          isCorrect: false,
          label:
            "The term *stock rotation* replaces the measured comparison and the affected groups' experience.",
        },
        {
          isCorrect: false,
          label:
            "The definition shows that newer suitable stock should always be used before older stock.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
