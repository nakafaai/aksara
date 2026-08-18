import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Wenn keine Trockenzeit ist, werfen die Pflanzen ihre Blätter nicht ab.",
      value: false,
    },
    {
      label: "Wenn keine Trockenzeit ist, werfen die Pflanzen ihre Blätter ab.",
      value: false,
    },
    {
      label: "Wenn sich nicht viel Laub am Boden sammelt, ist Trockenzeit.",
      value: false,
    },
    {
      label:
        "Wenn Trockenzeit ist, sammelt sich möglicherweise viel Laub am Boden.",
      value: false,
    },
    {
      label: "Wenn Trockenzeit ist, sammelt sich viel Laub am Boden.",
      value: true,
    },
  ],
};

export default choices;
