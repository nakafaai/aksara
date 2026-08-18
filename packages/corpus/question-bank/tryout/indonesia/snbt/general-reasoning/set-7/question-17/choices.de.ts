import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Miras Bericht gelangt in die Warteschlange für die endgültige Entscheidung.",
      value: true,
    },
    {
      label: "Miras Bericht hat die Vollständigkeitsprüfung nicht bestanden.",
      value: false,
    },
    { label: "Miras Antrag wurde bereits genehmigt.", value: false },
    {
      label: "Die fachliche Prüfung wird bei Miras Bericht übersprungen.",
      value: false,
    },
    {
      label:
        "Jeder Bericht in der endgültigen Warteschlange wird automatisch genehmigt.",
      value: false,
    },
  ],
};

export default choices;
