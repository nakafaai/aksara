import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Handelspartner haben die Ausfuhren des Landes bereits beschränkt.",
      value: false,
    },
    {
      label:
        "Ein Handelsurteil hat den Rückgang der Erzeugerpreise unmittelbar verursacht.",
      value: false,
    },
    {
      label:
        "Vergeltungsmaßnahmen sind der einzige Faktor, der die Handelsbilanz bestimmt.",
      value: false,
    },
    {
      label:
        "Die vorgeschlagenen Hühnerimporte sind bereits auf den heimischen Markt gelangt.",
      value: false,
    },
    {
      label: "Unabhängige Geflügelbetriebe haben Verluste erlitten.",
      value: true,
    },
  ],
};

export default choices;
