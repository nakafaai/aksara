import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Jeder Pausensnack ist unsicher", value: false },
    {
      label: "Kinder sollten ihre Hauptmahlzeiten durch Snacks ersetzen",
      value: false,
    },
    {
      label:
        "Mikrobiologische und chemische Sicherheit können ignoriert werden, wenn ein Snack genügend Energie liefert",
      value: false,
    },
    {
      label:
        "Energie ist das einzige Ernährungskriterium bei der Auswahl eines Snacks",
      value: false,
    },
    {
      label:
        "Sichere, ausgewogene Pausensnacks können zur Nährstoffaufnahme von Kindern beitragen",
      value: true,
    },
  ],
};

export default choices;
