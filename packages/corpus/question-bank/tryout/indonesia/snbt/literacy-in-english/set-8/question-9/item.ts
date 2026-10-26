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
            "The definition explains why glossary entries need context: suitable wording depends on the situation and purpose, not on a single universal equivalent.",
        },
        {
          correct: false,
          label:
            "Defining *register* proves that every participant should use the same wording in every setting.",
        },
        {
          correct: false,
          label:
            "The definition makes regional and family usage irrelevant to the glossary.",
        },
        {
          correct: false,
          label:
            "The term *register* replaces the measured comparison and peer review evidence.",
        },
        {
          correct: false,
          label:
            "The definition shows that an informal family expression is unsuitable in every public or private situation.",
        },
      ],
    },
  },
};

export default item;
