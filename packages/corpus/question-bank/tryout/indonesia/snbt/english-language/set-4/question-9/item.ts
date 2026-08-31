import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Defining *plain language* proves that every visitor understands the new captions without further testing.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes *plain language* identical to screen-reader compatibility, so the missing group no longer matters.",
        },
        {
          isCorrect: false,
          label:
            "The term *plain language* replaces the measured comparison and visitors' experience with a label that settles the decision.",
        },
        {
          isCorrect: false,
          label:
            "The definition requires captions to remove every interpretation and contain observations only.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains the accessibility goal of the short captions, while the comparison and later screen-reader testing still determine whether that goal is met.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
