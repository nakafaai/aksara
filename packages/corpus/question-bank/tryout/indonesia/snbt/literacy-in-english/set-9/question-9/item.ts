import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Defining *system alignment* proves that matching symbols alone caused every correctly sorted bag.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes evening-to-evening variation irrelevant to the follow-up.",
        },
        {
          isCorrect: false,
          label:
            "The term *system alignment* replaces the measured comparison and consultation evidence.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why permits and bins need the same symbols: the disposal decision begins at the stall and must remain consistent at collection.",
        },
        {
          isCorrect: false,
          label:
            "The definition shows that correctly coloured bins are enough even when stall permits use different symbols.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
