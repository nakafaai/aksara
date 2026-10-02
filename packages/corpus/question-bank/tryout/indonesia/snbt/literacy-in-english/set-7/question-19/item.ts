import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The definition identifies the story's driving struggle: the alert contains accurate knowledge but fails to direct action before time runs out.",
        },
        {
          isCorrect: false,
          label:
            "The term *narrative conflict* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          isCorrect: false,
          label:
            "The definition treats *narrative conflict* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          isCorrect: false,
          label:
            "The term *narrative conflict* makes the reader's personal impression sufficient even when it conflicts with story details.",
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
