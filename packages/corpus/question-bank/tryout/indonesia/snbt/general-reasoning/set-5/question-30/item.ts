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
          isCorrect: false,
          label: "Kompass : Geschwindigkeit",
        },
        {
          isCorrect: true,
          label: "Stoppuhr : Dauer",
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
          isCorrect: false,
          label: "compass : speed",
        },
        {
          isCorrect: true,
          label: "stopwatch : duration",
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
          isCorrect: false,
          label: "kompas : kecepatan",
        },
        {
          isCorrect: true,
          label: "stopwatch : durasi",
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
