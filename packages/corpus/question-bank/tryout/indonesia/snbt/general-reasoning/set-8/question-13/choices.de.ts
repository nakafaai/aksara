import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Viele Lernende berichten, dass die Erinnerungen ihnen bei den Fristen geholfen haben.",
      value: false,
    },
    {
      label:
        "Vergleichbare Klassen ohne App zeigten keinen Anstieg pünktlicher Abgaben.",
      value: false,
    },
    {
      label:
        "Die Schule verwendete in beiden Zeiträumen dieselbe Definition von „pünktlich“.",
      value: false,
    },
    {
      label: "Die App erinnert einen Tag vor jeder Abgabefrist.",
      value: false,
    },
    {
      label:
        "In derselben Woche wurde die Abgabefrist von 17 Uhr bis Mitternacht verlängert.",
      value: true,
    },
  ],
};

export default choices;
