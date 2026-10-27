import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The definition explains why entry-date labels matter: they help volunteers identify which suitable packages should be used first.",
        },
        {
          correct: false,
          label:
            "Defining *stock rotation* proves that the labels alone caused the trial value of $$47$$.",
        },
        {
          correct: false,
          label:
            "The definition makes changes in package demand irrelevant to any later decision.",
        },
        {
          correct: false,
          label:
            "The term *stock rotation* replaces the measured comparison and the affected groups' experience.",
        },
        {
          correct: false,
          label:
            "The definition shows that newer suitable stock should always be used before older stock.",
        },
      ],
    },
  },
};

export default item;
