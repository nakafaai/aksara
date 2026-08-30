import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Dito hat die vorausgesetzten Übungen nicht abgeschlossen",
        },
        {
          isCorrect: false,
          label: "Dito hat die vorausgesetzten Übungen abgeschlossen",
        },
        {
          isCorrect: false,
          label: "Dito hat am Übungstest teilgenommen",
        },
        {
          isCorrect: false,
          label: "Dito ist kein Lernender",
        },
        {
          isCorrect: false,
          label: "Dito hat einen Auswertungsbericht erhalten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Dito did not complete the prerequisite exercises",
        },
        {
          isCorrect: false,
          label: "Dito completed the prerequisite exercises",
        },
        {
          isCorrect: false,
          label: "Dito took the practice test",
        },
        {
          isCorrect: false,
          label: "Dito is not a student",
        },
        {
          isCorrect: false,
          label: "Dito received an evaluation report",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Dito tidak menyelesaikan latihan prasyarat",
        },
        {
          isCorrect: false,
          label: "Dito menyelesaikan latihan prasyarat",
        },
        {
          isCorrect: false,
          label: "Dito mengikuti tes latihan",
        },
        {
          isCorrect: false,
          label: "Dito bukan seorang siswa",
        },
        {
          isCorrect: false,
          label: "Dito menerima laporan evaluasi",
        },
      ],
    },
  },
};

export default item;
