import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Kind nimmt wenig Fett und viel Vitamin B6 auf",
      value: false,
    },
    {
      label: "Manche Kinder, die Bananen essen, nehmen wenig Fett auf",
      value: false,
    },
    {
      label: "Fleisch kann viel Fett, aber wenig Vitamin B6 liefern",
      value: false,
    },
    {
      label: "Das Kind nimmt überhaupt kein Fett auf",
      value: true,
    },
    {
      label: "Manche Kinder, die Bananen essen, nehmen viel Vitamin B6 auf",
      value: false,
    },
  ],
};

export default choices;
