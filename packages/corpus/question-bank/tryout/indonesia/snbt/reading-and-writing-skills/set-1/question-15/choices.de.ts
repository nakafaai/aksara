import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Verunreinigung von Wasserquellen hängt mit Sanitärversorgung und Abwasser zusammen.",
      value: true,
    },
    {
      label:
        "Die Verunreinigung von Wasserquellen in vielen indonesischen Gemeinden hängt eng mit Sanitärversorgung und Abwasser zusammen.",
      value: false,
    },
    {
      label: "Unsichere Sanitärversorgung verunreinigt Wasserquellen.",
      value: false,
    },
    {
      label: "Die Verunreinigung von Wasserquellen hängt eng zusammen.",
      value: false,
    },
    {
      label:
        "Die Verunreinigung von Wasserquellen verursacht Sanitärversorgung und Abwasser.",
      value: false,
    },
  ],
};

export default choices;
