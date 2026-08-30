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
          isCorrect: true,
          label: "Thermometer : Temperatur",
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
          isCorrect: true,
          label: "thermometer : temperature",
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
          isCorrect: true,
          label: "termometer : suhu",
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
          isCorrect: false,
          label: "kompas : kecepatan",
        },
      ],
    },
  },
};

export default item;
