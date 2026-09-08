import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Alle Bewohner des Dorfes Nelayan stellen Bio-Fischfutter oder nicht biologisches Fischfutter her",
        },
        {
          isCorrect: false,
          label:
            "Alle Bewohner des Dorfes Nelayan stellen Bio- und nicht biologische Futtermittel her",
        },
        {
          isCorrect: false,
          label: "Alle Bewohner des Dorfes Nelayan haben kein Zuchtfläche",
        },
        {
          isCorrect: false,
          label: "Alle Bewohner des Dorfes Nelayan verfügen über Zuchtfläche",
        },
        {
          isCorrect: false,
          label:
            "Einige Bewohner des Dorfes Nelayan, die Fische züchten, haben kein nicht biologisches Futter",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "All residents of Nelayan Village make organic fish feed or non-organic fish feed",
        },
        {
          isCorrect: false,
          label:
            "All residents of Nelayan Village make organic feed and non-organic feed",
        },
        {
          isCorrect: false,
          label:
            "All residents of Nelayan Village do not have cultivation land",
        },
        {
          isCorrect: false,
          label: "All residents of Nelayan Village have cultivation land",
        },
        {
          isCorrect: false,
          label:
            "Some residents of Nelayan Village who farm fish do not have non-organic feed",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Semua penduduk Desa Nelayan membuat pakan ikan organik atau pakan ikan nonorganik",
        },
        {
          isCorrect: false,
          label:
            "Semua penduduk Desa Nelayan membuat pakan organik dan pakan nonorganik",
        },
        {
          isCorrect: false,
          label: "Semua penduduk Desa Nelayan tidak memiliki lahan budi daya",
        },
        {
          isCorrect: false,
          label: "Semua penduduk Desa Nelayan memiliki lahan budi daya",
        },
        {
          isCorrect: false,
          label:
            "Sebagian penduduk Desa Nelayan yang membudidaya ikan tidak memiliki pakan nonorganik",
        },
      ],
    },
  },
};

export default item;
