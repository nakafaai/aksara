import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "senkt den Blutdruck",
        },
        {
          isCorrect: false,
          label: "beugt Herz-Kreislauf-Erkrankungen vor",
        },
        {
          isCorrect: false,
          label: "beschleunigt die Verdauung",
        },
        {
          isCorrect: true,
          label: "erhöht den Blutdruck",
        },
        {
          isCorrect: false,
          label: "beseitigt den Kaliumbedarf des Körpers",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "lowers blood pressure",
        },
        {
          isCorrect: false,
          label: "prevents cardiovascular disease",
        },
        {
          isCorrect: false,
          label: "accelerates digestion",
        },
        {
          isCorrect: true,
          label: "raises blood pressure",
        },
        {
          isCorrect: false,
          label: "removes the body's need for potassium",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menurunkan tekanan darah",
        },
        {
          isCorrect: false,
          label: "mencegah penyakit kardiovaskular",
        },
        {
          isCorrect: false,
          label: "mempercepat pencernaan",
        },
        {
          isCorrect: true,
          label: "meningkatkan tekanan darah",
        },
        {
          isCorrect: false,
          label: "menghilangkan kebutuhan tubuh akan kalium",
        },
      ],
    },
  },
};

export default item;
