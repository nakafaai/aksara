import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Insekten.",
      value: false,
    },
    {
      label: "kleine Tiere.",
      value: false,
    },
    {
      label: "Beutetiere der Fledermäuse.",
      value: false,
    },
    {
      label: "Fledermäuse.",
      value: true,
    },
    {
      label: "Insekten und Kleintiere.",
      value: false,
    },
  ],
};

export default choices;
