import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "the other sentences list devices without explaining the opening claim.",
        },
        {
          isCorrect: true,
          label:
            "the other sentences explain what successful integration looks like and how it supports the opening claim.",
        },
        {
          isCorrect: false,
          label:
            "the other sentences give historical examples that are unrelated to the opening claim.",
        },
        {
          isCorrect: false,
          label:
            "the first sentence contradicts the warnings in the other sentences.",
        },
        {
          isCorrect: false,
          label:
            "the other sentences repeat the first sentence without adding detail.",
        },
      ],
    },
  },
};

export default item;
