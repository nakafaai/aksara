import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "the other sentences list devices without explaining the opening claim.",
        },
        {
          correct: false,
          label:
            "the other sentences give historical examples that are unrelated to the opening claim.",
        },
        {
          correct: false,
          label:
            "the first sentence contradicts the warnings in the other sentences.",
        },
        {
          correct: false,
          label:
            "the other sentences repeat the first sentence without adding detail.",
        },
        {
          correct: true,
          label:
            "the other sentences explain what successful integration looks like and how it supports the opening claim.",
        },
      ],
    },
  },
};

export default item;
