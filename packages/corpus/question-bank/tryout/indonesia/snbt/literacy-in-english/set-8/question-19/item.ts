import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *metaphor* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          isCorrect: false,
          label:
            "The definition treats *metaphor* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          isCorrect: false,
          label:
            "The term *metaphor* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains the card-as-doorway comparison: turning the card becomes a way of moving between relationships through language.",
        },
        {
          isCorrect: false,
          label:
            "The definition explains only the setting, so the recurring object and the character's action are irrelevant.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
