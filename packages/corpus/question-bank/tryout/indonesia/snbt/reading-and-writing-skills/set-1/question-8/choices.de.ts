import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "konkurriert mit.",
      value: false,
    },
    {
      label: "ahmt nach.",
      value: false,
    },
    {
      label: "gleicht.",
      value: true,
    },
    {
      label: "folgt.",
      value: false,
    },
    {
      label: "ersetzt.",
      value: false,
    },
  ],
};

export default choices;
