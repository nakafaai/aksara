import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Voltmeter : Spannung",
        },
        {
          isCorrect: false,
          label: "Kompass : Geschwindigkeit",
        },
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
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "voltmeter : voltage",
        },
        {
          isCorrect: false,
          label: "compass : speed",
        },
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
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "voltmeter : tegangan",
        },
        {
          isCorrect: false,
          label: "kompas : kecepatan",
        },
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
      ],
    },
  },
};

export default item;
