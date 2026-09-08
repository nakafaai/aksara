import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *plot structure* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          isCorrect: false,
          label:
            "The definition treats *plot structure* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains the sequence: blame falls on the bin, the backward search reveals the outdated permit, and the final comparison leads the team to correct the symbols.",
        },
        {
          isCorrect: false,
          label:
            "The term *plot structure* makes the reader's personal impression sufficient even when it conflicts with story details.",
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
