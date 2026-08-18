import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Während es regnet, werden die Straßen nass.",
      value: false,
    },
    {
      label: "Wenn das Abendessen fertig ist, können die Kinder essen.",
      value: false,
    },
    {
      label: "Vor Sonnenaufgang singen die Vögel laut.",
      value: false,
    },
    {
      label:
        "Nachdem der Unterricht endet, sollte jeder Schüler die Aufgabe umgehend abgeben.",
      value: true,
    },
    {
      label: "Wenn die Glocke läutet, wird der Schulflur laut.",
      value: false,
    },
  ],
};

export default choices;
