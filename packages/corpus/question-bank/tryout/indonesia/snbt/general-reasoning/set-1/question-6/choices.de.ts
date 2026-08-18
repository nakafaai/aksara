import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Das Ministerium setzte sein gesamtes Budget ein, um einen dauerhaften Anstieg bei jeder Kulturpflanze zu garantieren.",
      value: false,
    },
    {
      label:
        "Die Maisproduktion stieg im Berichtszeitraum weniger als die Reisproduktion.",
      value: false,
    },
    {
      label:
        "Die Zahlen beweisen, dass die Neuausrichtung des Budgets die einzige Ursache für die Produktionssteigerungen war.",
      value: false,
    },
    {
      label:
        "Das Ministerium räumte der Produktionsförderung Vorrang ein, und seine Veröffentlichung von 2017 berichtete über historische Zuwächse bei Reis und Mais.",
      value: true,
    },
    {
      label:
        "Der verbleibende Anteil des Ministeriumsbudgets wurde nicht verwendet.",
      value: false,
    },
  ],
};

export default choices;
