import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Unternehmen B verzeichnete den höchsten prozentualen Anstieg",
      value: false,
    },
    {
      label: "Die Nutzerzahlen schwanken bei jedem Unternehmen",
      value: false,
    },
    {
      label: "Unternehmen B verzeichnete den größten prozentualen Rückgang",
      value: false,
    },
    {
      label: "Unternehmen C hat die niedrigste Dreimonatssumme",
      value: true,
    },
    {
      label: "Unternehmen B hat die höchste Dreimonatssumme",
      value: false,
    },
  ],
};

export default choices;
