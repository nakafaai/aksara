import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Lupe : Zeit",
        },
        {
          isCorrect: false,
          label: "Lineal : Temperatur",
        },
        {
          isCorrect: false,
          label: "Uhr : Länge",
        },
        {
          isCorrect: true,
          label: "Regenmesser : Niederschlag",
        },
        {
          isCorrect: false,
          label: "Kompass : Geschwindigkeit",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "magnifier : time",
        },
        {
          isCorrect: false,
          label: "ruler : temperature",
        },
        {
          isCorrect: false,
          label: "clock : length",
        },
        {
          isCorrect: true,
          label: "rain gauge : rainfall",
        },
        {
          isCorrect: false,
          label: "compass : speed",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kaca pembesar : waktu",
        },
        {
          isCorrect: false,
          label: "penggaris : suhu",
        },
        {
          isCorrect: false,
          label: "jam : panjang",
        },
        {
          isCorrect: true,
          label: "penakar hujan : curah hujan",
        },
        {
          isCorrect: false,
          label: "kompas : kecepatan",
        },
      ],
    },
  },
};

export default item;
