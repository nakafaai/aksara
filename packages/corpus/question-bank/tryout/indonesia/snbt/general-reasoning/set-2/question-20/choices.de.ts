import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Indonesiens Bekleidungsexporte in die Vereinigten Staaten sanken um $$9{,}3\\%$$.",
      value: false,
    },
    {
      label:
        "Japan ist der wichtigste Markt für Indonesiens Konfektionsbekleidung.",
      value: false,
    },
    {
      label:
        "Der wichtigste Markt für Indonesiens Konfektionsbekleidung waren die Vereinigten Staaten.",
      value: true,
    },
    {
      label:
        "Die USA und Deutschland sind die beiden Länder mit den höchsten Exportwerten.",
      value: false,
    },
    {
      label:
        "Der Wert der Bekleidungsexporte in die Vereinigten Staaten war niedriger als im Vorjahr.",
      value: false,
    },
  ],
};

export default choices;
