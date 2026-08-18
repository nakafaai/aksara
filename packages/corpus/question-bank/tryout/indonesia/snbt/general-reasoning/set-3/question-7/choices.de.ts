import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Niedrigere Mindestgeldstrafen würden die Rückgewinnung staatlicher Verluste erschweren.",
      value: false,
    },
    {
      label:
        "Die milderen Bestimmungen würden die Abschreckung schwächen und die Rückgewinnung staatlicher Verluste erschweren.",
      value: false,
    },
    {
      label:
        "Einige Bestimmungen sind milder als das Korruptionsgesetz und die Korruption in Indonesien wird zurückgehen.",
      value: true,
    },
    {
      label: "Mehrere Bestimmungen sind milder als das Korruptionsgesetz.",
      value: false,
    },
    {
      label:
        "Die milderen Bestimmungen sollten die Abschreckung schwächen und Korruption begünstigen.",
      value: false,
    },
  ],
};

export default choices;
