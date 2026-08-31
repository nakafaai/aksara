import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The term *motif* confirms one final outcome and therefore removes the need to interpret the ending.",
        },
        {
          isCorrect: false,
          label:
            "The definition treats *motif* as the physical object itself rather than as a feature of the narrative ending.",
        },
        {
          isCorrect: false,
          label:
            "The term *motif* makes the reader's personal impression sufficient even when it conflicts with story details.",
        },
        {
          isCorrect: true,
          label:
            "The definition of *motif* identifies how the recurring stamp links the missing record, Samira's action, and the next volunteer's response into one idea.",
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
