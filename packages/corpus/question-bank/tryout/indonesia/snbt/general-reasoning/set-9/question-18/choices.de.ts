import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Studienanfänger der Universität $$P$$ gehören zur Gruppe der Schulabgänger ohne Abschluss",
      value: true,
    },
    {
      label:
        "Jeder Studienanfänger der Universität $$P$$ hat die Schule abgeschlossen",
      value: false,
    },
    {
      label:
        "Kein Schüler ohne Abschluss beginnt im selben Jahrgang an der Universität $$P$$",
      value: false,
    },
    {
      label:
        "Jeder Schüler ohne Abschluss nimmt am Vermittlungsprogramm der Schule teil",
      value: false,
    },
    {
      label:
        "Die beiden Gruppen Schulabschluss und Abgang ohne Abschluss überschneiden sich nicht",
      value: false,
    },
  ],
};

export default choices;
