import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "der Ursprung des Coronavirus.",
      value: false,
    },
    {
      label:
        "Pocken sind im Vergleich zum Coronavirus eine gefährlichere Krankheit.",
      value: false,
    },
    {
      label:
        "Forschung mit alter DNA zur Geschichte und Evolution des Variola-Virus.",
      value: true,
    },
    {
      label: "die Ursache für das Verschwinden der Wikinger.",
      value: false,
    },
    {
      label: "die Ursache für das Aussterben der alten Pocken.",
      value: false,
    },
  ],
};

export default choices;
