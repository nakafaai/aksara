import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Stunting bedeutet ein zu geringes Gewicht für die Körpergröße",
      value: false,
    },
    {
      label: "Stunting kann nur durch genetische Faktoren verursacht werden",
      value: false,
    },
    {
      label: "Stunting verursacht immer eine kognitive Behinderung",
      value: false,
    },
    {
      label:
        "Stunting ist eine zu geringe Körpergröße für das Alter und steht häufig mit chronischer oder wiederkehrender Unterernährung in Verbindung",
      value: true,
    },
    {
      label: "Überernährung ist die einzige Ursache von Stunting",
      value: false,
    },
  ],
};

export default choices;
