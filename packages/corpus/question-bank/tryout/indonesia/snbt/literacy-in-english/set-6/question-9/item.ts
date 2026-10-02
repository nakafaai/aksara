import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The definition explains why completing a repair efficiently matters: a successful repair can keep a product useful for longer.",
        },
        {
          isCorrect: false,
          label:
            "Defining *product-life extension* proves that the tool card alone caused every completed repair.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes differences in repair difficulty irrelevant to the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The term *product-life extension* replaces the measured comparison and consultation evidence.",
        },
        {
          isCorrect: false,
          label:
            "The definition shows that every attempted repair will keep a product useful for the same length of time.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
