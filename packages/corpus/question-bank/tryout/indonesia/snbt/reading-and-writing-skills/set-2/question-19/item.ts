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
              text: "die Geschichte von Papeda in Ostindonesien.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "die Entwicklung von Sago durch die Diversifizierung des Lebensmittelangebots und Produktinnovationen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "das Verfahren zur Gewinnung von Stärke aus Sagostämmen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die sieben Teilsektoren der indonesischen Landwirtschaftszählung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "der Exportpreis indonesischer Sagostärke." },
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
              text: "the history of papeda in eastern Indonesia.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "developing sago through food diversification and product innovation.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the procedure for extracting starch from sago trunks.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the seven subsectors of Indonesia's Agricultural Census.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "the export price of Indonesian sago starch.",
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
            { kind: "text", text: "sejarah papeda di Indonesia bagian timur." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "pengembangan sagu melalui penganekaragaman pangan dan inovasi produk.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "tata cara mengekstraksi pati dari batang sagu.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "tujuh subsektor dalam Sensus Pertanian Indonesia.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "harga ekspor pati sagu Indonesia." }],
        },
      ],
    },
  },
};

export default item;
