import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Keine Fledermaus kann vom Boden starten.",
      value: false,
    },
    {
      label:
        "Fledermäuse müssen ihre Krallen mit ständiger Muskelarbeit um eine Sitzfläche geschlossen halten.",
      value: false,
    },
    {
      label:
        "Eine hängende Fledermaus kann ihren Griff lösen und sich für den Abflug in den freien Luftraum fallen lassen.",
      value: true,
    },
    {
      label:
        "Jede Fledermausart zeigt genau dasselbe Ruhe- und Startverhalten.",
      value: false,
    },
    {
      label:
        "Ein kopfüber hängendes Quartier garantiert, dass kein Raubtier eine Fledermaus erreichen kann.",
      value: false,
    },
  ],
};

export default choices;
