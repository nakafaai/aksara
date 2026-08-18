import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Jeder Bezirk der Stadt muss Hochwasserstatus erhalten.",
      value: false,
    },
    {
      label: "Bezirk X kann keinen Hochwasserstatus erhalten.",
      value: false,
    },
    {
      label:
        "Die registrierten Einwohnerinnen und Einwohner von Bezirk X erhalten eine Evakuierungsanordnung.",
      value: true,
    },
    {
      label: "Alle Menschen in der Stadt müssen die Stadt sofort verlassen.",
      value: false,
    },
    {
      label:
        "Ob die registrierten Einwohnerinnen und Einwohner von Bezirk X eine Evakuierungsanordnung erhalten, lässt sich nicht bestimmen.",
      value: false,
    },
  ],
};

export default choices;
