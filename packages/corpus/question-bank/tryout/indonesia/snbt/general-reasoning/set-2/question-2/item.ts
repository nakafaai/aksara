import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Bewohner des Dorfes Nelayan stellen Bio- und anorganische Futtermittel her",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Alle Bewohner des Dorfes Nelayan stellen Bio-Fischfutter oder anorganisches Fischfutter her",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Bewohner des Dorfes Nelayan haben kein Anbauland",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Bewohner des Dorfes Nelayan verfügen über Ackerland",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Einige Bewohner des Dorfes Nelayan, die Fische züchten, haben kein anorganisches Futter",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "All residents of Nelayan Village make organic feed and inorganic feed",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "All residents of Nelayan Village make organic fish feed or inorganic fish feed",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "All residents of Nelayan Village do not have cultivation land",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "All residents of Nelayan Village have cultivation land",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Some residents of Nelayan Village who farm fish do not have inorganic feed",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua penduduk Desa Nelayan membuat pakan organik dan pakan anorganik",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Semua penduduk Desa Nelayan membuat pakan ikan organik atau pakan ikan anorganik",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua penduduk Desa Nelayan tidak memiliki lahan budi daya",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua penduduk Desa Nelayan memiliki lahan budi daya",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebagian penduduk Desa Nelayan yang membudidaya ikan tidak memiliki pakan anorganik",
            },
          ],
        },
      ],
    },
  },
};

export default item;
