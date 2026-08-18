import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Ein Delir kann auch bei anderen akuten Erkrankungen als COVID-19 auftreten.",
      value: false,
    },
    {
      label: "Jeder Mensch mit Delir muss mit SARS-CoV-2 infiziert sein.",
      value: true,
    },
    {
      label:
        "Bei manchen älteren Menschen mit COVID-19 kann ein Delir auftreten.",
      value: false,
    },
    {
      label: "Ein Delir beginnt akut und seine Anzeichen können schwanken.",
      value: false,
    },
    {
      label:
        "Bei einem möglichen Delir sollte die zugrunde liegende Ursache abgeklärt werden.",
      value: false,
    },
  ],
};

export default choices;
