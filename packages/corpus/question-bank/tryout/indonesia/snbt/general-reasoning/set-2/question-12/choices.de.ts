import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Pflanz- oder Rendengsaison der Landwirte wird ungewiss und den Landwirten mangelt es an Saatgut und Dünger",
      value: false,
    },
    {
      label:
        "Die Umsetzung der Reisbeschaffung wird zunehmend suboptimal und die Regierung ist gezwungen, Reis zu importieren",
      value: false,
    },
    {
      label:
        "Die staatlichen Reisvorräte oder CBP (staatliche Reisreserven) drohen zurückzugehen",
      value: true,
    },
    {
      label:
        "Der Lebensmittelverteilungsmechanismus für Raskin oder Rastra wird auf direkte Transfers umgestellt",
      value: false,
    },
    {
      label:
        "Der HPP (Government Purchase Price) wird im Vergleich zu den Marktpreisen immer niedriger",
      value: false,
    },
  ],
};

export default choices;
