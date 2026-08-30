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
          isCorrect: false,
          label: "Uhr : Länge",
        },
        {
          isCorrect: true,
          label: "Waage : Masse",
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
          isCorrect: false,
          label: "clock : length",
        },
        {
          isCorrect: true,
          label: "balance : mass",
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
          isCorrect: false,
          label: "jam : panjang",
        },
        {
          isCorrect: true,
          label: "neraca : massa",
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
