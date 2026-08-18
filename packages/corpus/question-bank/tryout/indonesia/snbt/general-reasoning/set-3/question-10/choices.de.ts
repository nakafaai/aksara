import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jeder für die Jackfrucht angegebene Nährstoffwert ist höher als der entsprechende Wert der Pomelo.",
      value: false,
    },
    {
      label:
        "Jeder für die Avocado angegebene Nährstoffwert ist höher als der entsprechende Wert der Pomelo.",
      value: false,
    },
    {
      label:
        "Der Gesamtproteingehalt von Pampelmuse und Jackfrucht ist höher als der Gesamtproteingehalt von Avocado und Ambarella.",
      value: false,
    },
    {
      label:
        "Der Gesamtkalziumgehalt von Pampelmuse und Avocado ist niedriger als der Gesamtkalziumgehalt von Ambarella und Jackfrucht.",
      value: true,
    },
    {
      label:
        "Die Jackfrucht hat bei jedem aufgeführten Nährstoff den höchsten Wert.",
      value: false,
    },
  ],
};

export default choices;
