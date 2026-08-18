import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Water exercise can be helpful for some people with arthritis.",
      value: false,
    },
    {
      label: "Water exercise may improve older adults' quality of life.",
      value: false,
    },
    {
      label: "Swimming has health benefits and therefore carries no risks.",
      value: true,
    },
    { label: "Swimming may improve mood for some people.", value: false },
    {
      label: "A balanced decision includes suitable safety measures.",
      value: false,
    },
  ],
};

export default choices;
