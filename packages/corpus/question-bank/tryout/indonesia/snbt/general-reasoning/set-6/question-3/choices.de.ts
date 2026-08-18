import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Wegen des Regens fallen beide Tätigkeiten aus",
      value: false,
    },
    {
      label: "Am Sonntag werden Wertstoffe gesammelt",
      value: true,
    },
    {
      label: "Am Sonntag werden beide Tätigkeiten durchgeführt",
      value: false,
    },
    {
      label: "Am Sonntag werden nur die Abflussrinnen gereinigt",
      value: false,
    },
    {
      label: "Die Gemeinschaftsaktion wird ohne Alternative verschoben",
      value: false,
    },
  ],
};

export default choices;
