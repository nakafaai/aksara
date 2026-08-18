import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "die Nährstoffe in Milch und Milcherzeugnissen.",
      value: false,
    },
    {
      label: "Jeder Mensch sollte dieselbe Menge Milcherzeugnisse verzehren.",
      value: false,
    },
    {
      label: "Laktase wandelt Laktose im Dickdarm in Gas um.",
      value: false,
    },
    {
      label:
        "Menschen verdauen Laktose unterschiedlich, und ein niedriger Laktasespiegel kann eine Malabsorption verursachen.",
      value: true,
    },
    {
      label: "Fermentierte Milcherzeugnisse sind immer laktosefrei.",
      value: false,
    },
  ],
};

export default choices;
