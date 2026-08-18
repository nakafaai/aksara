import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Instantnudeln liefern bei täglichem Verzehr alle Nährstoffe, die der Körper benötigt.",
      value: false,
    },
    {
      label:
        "Instantnudeln sollten nur gelegentlich gegessen und mit weniger Würzmischung sowie mit Gemüse und Protein ergänzt werden.",
      value: true,
    },
    {
      label:
        "Durch den Austausch des Kochwassers verschwindet sämtliches Natrium aus den Instantnudeln.",
      value: false,
    },
    {
      label: "Olivenöl macht unbegrenzte Portionen Instantnudeln gesund.",
      value: false,
    },
    {
      label: "Gemüse hebt den Natriumgehalt der Würzmischung vollständig auf.",
      value: false,
    },
  ],
};

export default choices;
