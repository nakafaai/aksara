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
          isCorrect: true,
          label: "Lineal : Länge",
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
          isCorrect: false,
          label: "ruler : temperature",
        },
        {
          isCorrect: true,
          label: "ruler : length",
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
          isCorrect: false,
          label: "penggaris : suhu",
        },
        {
          isCorrect: true,
          label: "penggaris : panjang",
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
