import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Zählung beweist, dass die meisten indonesischen Landwirte jung sind.",
      value: false,
    },
    {
      label:
        "Daher bietet die Landwirtschaftszählung 2023 eine breite, standardisierte Datengrundlage für die Gestaltung der indonesischen Agrarpolitik.",
      value: true,
    },
    {
      label:
        "Der Rückgang landwirtschaftlicher Einzelbetriebe beweist, dass Indonesiens Agrarsektor schrumpft.",
      value: false,
    },
    {
      label:
        "Die städtische Landwirtschaft ist heute die größte Form der Landwirtschaft in Indonesien.",
      value: false,
    },
    {
      label:
        "Die Einhaltung internationaler Zählungsstandards verbessert allein das Wohlergehen der Landwirte.",
      value: false,
    },
  ],
};

export default choices;
