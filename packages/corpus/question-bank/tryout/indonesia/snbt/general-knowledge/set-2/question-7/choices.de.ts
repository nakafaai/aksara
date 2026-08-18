import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Tiere, die gejagt werden.",
      value: false,
    },
    {
      label: "kleine Tiere, die von anderen Tieren gefressen werden.",
      value: false,
    },
    {
      label: "kleine Insekten.",
      value: false,
    },
    {
      label: "Insekten und andere Kleintiere.",
      value: false,
    },
    {
      label: "Tiere, die andere Tiere jagen.",
      value: true,
    },
  ],
};

export default choices;
