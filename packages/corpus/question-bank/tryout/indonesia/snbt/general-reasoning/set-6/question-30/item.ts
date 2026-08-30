import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Lineal : Temperatur",
        },
        {
          isCorrect: true,
          label: "Barometer : Druck",
        },
        {
          isCorrect: false,
          label: "Uhr : Länge",
        },
        {
          isCorrect: false,
          label: "Kompass : Geschwindigkeit",
        },
        {
          isCorrect: false,
          label: "Lupe : Zeit",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ruler : temperature",
        },
        {
          isCorrect: true,
          label: "barometer : pressure",
        },
        {
          isCorrect: false,
          label: "clock : length",
        },
        {
          isCorrect: false,
          label: "compass : speed",
        },
        {
          isCorrect: false,
          label: "magnifier : time",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "penggaris : suhu",
        },
        {
          isCorrect: true,
          label: "barometer : tekanan",
        },
        {
          isCorrect: false,
          label: "jam : panjang",
        },
        {
          isCorrect: false,
          label: "kompas : kecepatan",
        },
        {
          isCorrect: false,
          label: "kaca pembesar : waktu",
        },
      ],
    },
  },
};

export default item;
