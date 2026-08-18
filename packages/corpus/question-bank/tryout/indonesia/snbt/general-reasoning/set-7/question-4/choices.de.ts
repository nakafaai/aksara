import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Arins Arbeitssitzung läuft ohne Unterbrechung weiter.",
      value: false,
    },
    {
      label: "Arins Zugangsausweis bleibt während der Überprüfung aktiv.",
      value: false,
    },
    {
      label:
        "Arins Zugangsausweis wird bis zum Abschluss der Überprüfung gesperrt.",
      value: true,
    },
    {
      label: "Der Zugangsausweis der Aufsichtsperson wird gesperrt.",
      value: false,
    },
    {
      label: "Der Laserschneider wird dauerhaft aus dem Labor entfernt.",
      value: false,
    },
  ],
};

export default choices;
