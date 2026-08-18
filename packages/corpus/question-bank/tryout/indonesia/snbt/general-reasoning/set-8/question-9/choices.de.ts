import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Wer kein hohes Prüfungsergebnis erzielt, hat die eigene Zeit nicht gut eingeteilt.",
      value: true,
    },
    {
      label:
        "Wer die eigene Zeit gut einteilt, erzielt kein hohes Prüfungsergebnis.",
      value: false,
    },
    {
      label: "Wer regelmäßig lernt, muss die eigene Zeit gut eingeteilt haben.",
      value: false,
    },
    {
      label:
        "Ein hohes Prüfungsergebnis garantiert, dass regelmäßig gelernt wurde.",
      value: false,
    },
    {
      label: "Schlechte Zeiteinteilung garantiert ein hohes Prüfungsergebnis.",
      value: false,
    },
  ],
};

export default choices;
