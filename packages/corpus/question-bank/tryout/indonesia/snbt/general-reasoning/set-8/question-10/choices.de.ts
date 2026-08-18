import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Überlauftor öffnet sich auf jeden Fall automatisch.",
      value: false,
    },
    {
      label: "Die westlichen Beete bleiben auf jeden Fall trocken.",
      value: false,
    },
    {
      label: "Auf keinem Weg kann Wasser zu den westlichen Beeten gelangen.",
      value: false,
    },
    {
      label: "Die westlichen Beete können nicht grün werden.",
      value: false,
    },
    {
      label:
        "Ob die westlichen Beete Wasser erhalten, lässt sich nicht ableiten.",
      value: true,
    },
  ],
};

export default choices;
