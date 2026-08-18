import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Geschützte Lebensräume müssen vor Baubeginn kartiert werden.",
      value: false,
    },
    {
      label:
        "Ein Planungsabschnitt durch einen geschützten Lebensraum muss verlegt werden.",
      value: false,
    },
    {
      label:
        "Die ursprüngliche Brückentrasse darf während des Baus unverändert bleiben.",
      value: true,
    },
    {
      label:
        "Die ursprüngliche Brückentrasse durchquerte einen geschützten Nashornvogel-Lebensraum.",
      value: false,
    },
    {
      label: "Das Team verlegte die Brückentrasse vor Baubeginn.",
      value: false,
    },
  ],
};

export default choices;
