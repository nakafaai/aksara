import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Bei Nettoablagerung können Sedimente und Nährstoffe in der Aue zurückgehalten werden",
      value: false,
    },
    {
      label: "Erosion kann Sedimente und Nährstoffe aus der Aue forttragen",
      value: false,
    },
    {
      label:
        "Die Wirkung einer Überflutung hängt unter anderem vom Verhältnis zwischen Ablagerung und Erosion ab",
      value: false,
    },
    {
      label: "Jede saisonale Überschwemmung verbessert immer jeden Boden",
      value: true,
    },
    {
      label:
        "Zurückgehaltene Nährstoffe können das Pflanzenwachstum unterstützen, wenn die Ablagerung überwiegt",
      value: false,
    },
  ],
};

export default choices;
