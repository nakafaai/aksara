import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *irony* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          isCorrect: false,
          label:
            "The definition treats *irony* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          isCorrect: false,
          label:
            "The term *irony* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          isCorrect: true,
          label:
            "The definition of *irony* clarifies the contrast between an accurate board that misdirects passengers and the same information becoming useful after a simple rotation.",
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
