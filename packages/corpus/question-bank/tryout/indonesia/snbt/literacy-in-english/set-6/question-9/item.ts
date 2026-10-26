import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The definition explains why completing a repair efficiently matters: a successful repair can keep a product useful for longer.",
        },
        {
          correct: false,
          label:
            "Defining *product-life extension* proves that the tool card alone caused every completed repair.",
        },
        {
          correct: false,
          label:
            "The definition makes differences in repair difficulty irrelevant to the follow-up.",
        },
        {
          correct: false,
          label:
            "The term *product-life extension* replaces the measured comparison and consultation evidence.",
        },
        {
          correct: false,
          label:
            "The definition shows that every attempted repair will keep a product useful for the same length of time.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
