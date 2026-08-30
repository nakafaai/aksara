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
              text: "den Druck auf den indonesischen Automarkt im Jahr 2020.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "den Rückgang des Großhandelsabsatzes von 2019 auf 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "die Zahl der im April ausgelieferten Fahrzeuge.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "den Tiefpunkt des Absatzes im Mai." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "die Erholung des Absatzes im Dezember." },
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
              text: "the pressure on Indonesia's car market during 2020.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "the fall in wholesale sales from 2019 to 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "the number of vehicles shipped in April." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "the sales low reached in May." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "the recovery recorded in December." }],
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
              text: "tekanan terhadap pasar mobil Indonesia selama 2020.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "turunnya penjualan wholesales dari 2019 ke 2020.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "jumlah kendaraan yang dikirim pada April." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "titik terendah penjualan pada Mei." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pemulihan penjualan pada Desember." }],
        },
      ],
    },
  },
};

export default item;
