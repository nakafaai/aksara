import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "UNESCO works only to protect famous cultural monuments.",
      value: false,
    },
    {
      label:
        "UNESCO mainly writes domestic laws that every government must adopt.",
      value: false,
    },
    {
      label:
        "UNESCO was created to manage the Sustainable Development Goals after 2015.",
      value: false,
    },
    {
      label:
        "UNESCO builds peace through international cooperation, shared standards, knowledge, and programs across its fields of expertise.",
      value: true,
    },
    {
      label:
        "UNESCO replaces national education and science institutions with one global system.",
      value: false,
    },
  ],
};

export default choices;
