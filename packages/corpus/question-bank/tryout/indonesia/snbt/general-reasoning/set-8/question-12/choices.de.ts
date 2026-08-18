import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Teilnehmende berichten, dass die Mentorinnen und Mentoren hilfreiches Karrierefeedback geben.",
      value: false,
    },
    {
      label:
        "Die Zahl der Anmeldungen zum Mentoringprogramm ist im Laufe des Jahres gestiegen.",
      value: false,
    },
    {
      label:
        "Eine unabhängige Prüfung bestätigt die angegebene Verlängerungsquote.",
      value: false,
    },
    {
      label:
        "Verträge verlängern sich automatisch, wenn Beschäftigte nicht aktiv widersprechen.",
      value: true,
    },
    {
      label:
        "Mehrere Abteilungen planen für das nächste Jahr zusätzliche Mentoringsitzungen.",
      value: false,
    },
  ],
};

export default choices;
