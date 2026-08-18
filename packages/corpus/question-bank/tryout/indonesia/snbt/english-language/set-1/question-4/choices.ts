import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "the other sentences list devices without explaining the opening claim.",
      value: false,
    },
    {
      label:
        "the other sentences explain what successful integration looks like and how it supports the opening claim.",
      value: true,
    },
    {
      label:
        "the other sentences give historical examples that are unrelated to the opening claim.",
      value: false,
    },
    {
      label:
        "the first sentence contradicts the warnings in the other sentences.",
      value: false,
    },
    {
      label:
        "the other sentences repeat the first sentence without adding detail.",
      value: false,
    },
  ],
};

export default choices;
