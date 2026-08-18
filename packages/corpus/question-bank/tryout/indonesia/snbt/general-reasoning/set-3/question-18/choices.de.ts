import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Alle Teilnehmenden wählten Tee mit Zuckerzusatz.",
      value: false,
    },
    {
      label: "Alle Teetrinkenden gaben Zucker hinzu.",
      value: false,
    },
    {
      label: "Niemand trank Tee ohne Zuckerzusatz.",
      value: false,
    },
    {
      label: "Mindestens eine Person trank Tee ohne Zuckerzusatz.",
      value: true,
    },
    {
      label: "Alle Teilnehmenden, die ein Getränk wählten, wählten Tee.",
      value: false,
    },
  ],
};

export default choices;
