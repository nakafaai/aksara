import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Welche drei Risikotreiber nennt das Sendai-Rahmenwerk?",
      value: true,
    },
    {
      label: "Welches Land hat das Sendai-Rahmenwerk zuerst angenommen?",
      value: false,
    },
    {
      label:
        "Wie viel kostet die Wiederherstellung eines geschädigten Ökosystems?",
      value: false,
    },
    {
      label: "Wann begann die Umweltdegradation in Indonesien?",
      value: false,
    },
    {
      label:
        "Welche Methode zur Wiederherstellung von Ökosystemen ist am wirksamsten?",
      value: false,
    },
  ],
};

export default choices;
