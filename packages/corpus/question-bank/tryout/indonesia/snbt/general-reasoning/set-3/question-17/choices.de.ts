import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Viele junge Berufstätige bevorzugen ein Zimmer nahe der Arbeit, selbst wenn die Miete etwas höher ist.",
      value: false,
    },
    {
      label:
        "Eine niedrige Miete und ein kurzer Arbeitsweg machen ein Mietzimmer für Interessierte attraktiver.",
      value: false,
    },
    {
      label:
        "In vielen Bürovierteln ist der Mietaufschlag in Arbeitsplatznähe höher als die zusätzlichen Fahrtkosten eines weiter entfernten Zimmers, sodass die entfernte Wahl insgesamt weniger kostet.",
      value: true,
    },
    {
      label:
        "Junge Berufstätige vergleichen Miete und Fahrtkosten, wenn sie ihre monatlichen Gesamtkosten berechnen.",
      value: false,
    },
    {
      label:
        "Ein kürzerer Arbeitsweg verringert sowohl die Fahrzeit als auch die Zahl der zu zahlenden Fahrten.",
      value: false,
    },
  ],
};

export default choices;
