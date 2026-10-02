import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The definition explains why glossary entries need context: suitable wording depends on the situation and purpose, not on a single universal equivalent.",
        },
        {
          isCorrect: false,
          label:
            "Defining *register* proves that every participant should use the same wording in every setting.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes regional and family usage irrelevant to the glossary.",
        },
        {
          isCorrect: false,
          label:
            "The term *register* replaces the measured comparison and peer review evidence.",
        },
        {
          isCorrect: false,
          label:
            "The definition shows that an informal family expression is unsuitable in every public or private situation.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
