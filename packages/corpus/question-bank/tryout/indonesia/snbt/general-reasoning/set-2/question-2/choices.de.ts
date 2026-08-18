import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Alle Bewohner des Dorfes Nelayan stellen Bio- und anorganische Futtermittel her",
      value: false,
    },
    {
      label:
        "Alle Bewohner des Dorfes Nelayan stellen Bio-Fischfutter oder anorganisches Fischfutter her",
      value: true,
    },
    {
      label: "Alle Bewohner des Dorfes Nelayan haben kein Anbauland",
      value: false,
    },
    {
      label: "Alle Bewohner des Dorfes Nelayan verfügen über Ackerland",
      value: false,
    },
    {
      label:
        "Einige Bewohner des Dorfes Nelayan, die Fische züchten, haben kein anorganisches Futter",
      value: false,
    },
  ],
};

export default choices;
