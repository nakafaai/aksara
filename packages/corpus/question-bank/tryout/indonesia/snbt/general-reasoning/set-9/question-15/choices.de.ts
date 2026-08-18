import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Überschwemmungen können Trinkwasserquellen verunreinigen",
      value: false,
    },
    {
      label: "Stehendes Wasser kann Mücken als Brutstätte dienen",
      value: false,
    },
    {
      label:
        "Eine Überschwemmung allein beweist nicht, dass ein Ausbruch stattfinden wird",
      value: false,
    },
    {
      label:
        "Mehr stehendes Wasser verringert die Brutmöglichkeiten für Mücken immer",
      value: true,
    },
    {
      label:
        "Örtliche Bedingungen und Bekämpfungsmaßnahmen können das Ausbruchsrisiko beeinflussen",
      value: false,
    },
  ],
};

export default choices;
