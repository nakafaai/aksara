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
  en: [
    {
      label:
        "All residents of Nelayan Village make organic feed and inorganic feed",
      value: false,
    },
    {
      label:
        "All residents of Nelayan Village make organic fish feed or inorganic fish feed",
      value: true,
    },
    {
      label: "All residents of Nelayan Village do not have cultivation land",
      value: false,
    },
    {
      label: "All residents of Nelayan Village have cultivation land",
      value: false,
    },
    {
      label:
        "Some residents of Nelayan Village who farm fish do not have inorganic feed",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Semua penduduk Desa Nelayan membuat pakan organik dan pakan anorganik",
      value: false,
    },
    {
      label:
        "Semua penduduk Desa Nelayan membuat pakan ikan organik atau pakan ikan anorganik",
      value: true,
    },
    {
      label: "Semua penduduk Desa Nelayan tidak memiliki lahan budi daya",
      value: false,
    },
    {
      label: "Semua penduduk Desa Nelayan memiliki lahan budi daya",
      value: false,
    },
    {
      label:
        "Sebagian penduduk Desa Nelayan yang membudidaya ikan tidak memiliki pakan anorganik",
      value: false,
    },
  ],
};

export default choices;
