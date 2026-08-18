import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Den Doppelpunkt nach dem Wort „nämlich“ entfernen.",
      value: true,
    },
    {
      label:
        "Den Doppelpunkt nach dem Wort „nämlich“ durch ein Semikolon ersetzen.",
      value: false,
    },
    {
      label: "Das Komma vor dem Wort „nämlich“ entfernen.",
      value: false,
    },
    {
      label:
        "Direkt nach den Wörtern „Die Behörde“ einen Doppelpunkt ergänzen.",
      value: false,
    },
    {
      label: "Jedes Komma in der Aufzählung durch einen Punkt ersetzen.",
      value: false,
    },
  ],
};

export default choices;
