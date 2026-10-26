import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Defining *plain language* proves that every visitor understands the new captions without further testing.",
        },
        {
          correct: false,
          label:
            "The definition makes *plain language* identical to screen-reader compatibility, so the missing group no longer matters.",
        },
        {
          correct: false,
          label:
            "The term *plain language* replaces the measured comparison and visitors' experience with a label that settles the decision.",
        },
        {
          correct: false,
          label:
            "The definition requires captions to remove every interpretation and contain observations only.",
        },
        {
          correct: true,
          label:
            "The definition explains the accessibility goal of the revised captions, while the comparison and later screen-reader testing still determine whether that goal is met.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
