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
              text: "Die Importe steigen und fallen von Jahr zu Jahr.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Produktion, Verbrauch und Importe steigen jedes Jahr um denselben Betrag.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der höchste Verbrauch tritt im Jahr A auf.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Verbrauch übersteigt in jedem aufgeführten Jahr die inländische Produktion, und die Importe decken die Lücke.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Importe übersteigen in jedem aufgeführten Jahr die inländische Produktion.",
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
            { kind: "text", text: "Imports rise and fall from year to year." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Production, consumption, and imports rise by the same amount each year.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The highest consumption occurs in year A." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Consumption exceeds domestic production in every listed year, and imports cover the gap.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Imports exceed domestic production in every listed year.",
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
            { kind: "text", text: "Impor naik dan turun dari tahun ke tahun." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Produksi, konsumsi, dan impor bertambah dengan jumlah yang sama setiap tahun.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Konsumsi tertinggi terjadi pada tahun A." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Konsumsi melebihi produksi dalam negeri pada setiap tahun yang tercantum, dan impor menutup selisihnya.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Impor melebihi produksi dalam negeri pada setiap tahun yang tercantum.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
