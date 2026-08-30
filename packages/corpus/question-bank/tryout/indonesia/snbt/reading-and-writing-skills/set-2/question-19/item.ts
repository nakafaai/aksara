import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "die Geschichte von Papeda in Ostindonesien.",
        },
        {
          isCorrect: true,
          label:
            "die Entwicklung von Sago durch die Diversifizierung des Lebensmittelangebots und Produktinnovationen.",
        },
        {
          isCorrect: false,
          label: "das Verfahren zur Gewinnung von Stärke aus Sagostämmen.",
        },
        {
          isCorrect: false,
          label:
            "die sieben Teilsektoren der indonesischen Landwirtschaftszählung.",
        },
        {
          isCorrect: false,
          label: "der Exportpreis indonesischer Sagostärke.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "the history of papeda in eastern Indonesia.",
        },
        {
          isCorrect: true,
          label:
            "developing sago through food diversification and product innovation.",
        },
        {
          isCorrect: false,
          label: "the procedure for extracting starch from sago trunks.",
        },
        {
          isCorrect: false,
          label: "the seven subsectors of Indonesia's Agricultural Census.",
        },
        {
          isCorrect: false,
          label: "the export price of Indonesian sago starch.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sejarah papeda di Indonesia bagian timur.",
        },
        {
          isCorrect: true,
          label:
            "pengembangan sagu melalui penganekaragaman pangan dan inovasi produk.",
        },
        {
          isCorrect: false,
          label: "tata cara mengekstraksi pati dari batang sagu.",
        },
        {
          isCorrect: false,
          label: "tujuh subsektor dalam Sensus Pertanian Indonesia.",
        },
        {
          isCorrect: false,
          label: "harga ekspor pati sagu Indonesia.",
        },
      ],
    },
  },
};

export default item;
