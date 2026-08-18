import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der gesamte gemeinsame Arbeitseinsatz am Sonntag wurde wegen des Regens abgesagt.",
      value: false,
    },
    {
      label:
        "Beim gemeinsamen Arbeitseinsatz am Sonntag wurden wiederverwendbare Gegenstände gesammelt.",
      value: true,
    },
    {
      label:
        "Am Sonntag wurden sowohl der Entwässerungsgraben gereinigt als auch wiederverwendbare Gegenstände gesammelt.",
      value: false,
    },
    {
      label:
        "Am Sonntag wurde nur der Entwässerungsgraben gereinigt; wiederverwendbare Gegenstände wurden nicht gesammelt.",
      value: false,
    },
    {
      label:
        "Wegen des Regens fand am Sonntag überhaupt kein gemeinsamer Arbeitseinsatz statt.",
      value: false,
    },
  ],
};

export default choices;
