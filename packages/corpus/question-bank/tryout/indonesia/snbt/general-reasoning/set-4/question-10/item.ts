import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dito hat die vorausgesetzten Übungen abgeschlossen",
        },
        {
          isCorrect: false,
          label: "Dito nimmt nicht an einem Probetest teil",
        },
        {
          isCorrect: true,
          label: "Dito erhält einen Auswertungsbericht",
        },
        {
          isCorrect: false,
          label: "Dito erhält keinen Auswertungsbericht",
        },
        {
          isCorrect: false,
          label:
            "Dito hat die vorausgesetzten Übungen abgeschlossen und erhält einen Auswertungsbericht",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dito completed the prerequisite exercises",
        },
        {
          isCorrect: false,
          label: "Dito did not take a mock test",
        },
        {
          isCorrect: true,
          label: "Dito receives an evaluation report",
        },
        {
          isCorrect: false,
          label: "Dito receives no evaluation report",
        },
        {
          isCorrect: false,
          label:
            "Dito completed the prerequisite exercises and receives an evaluation report",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dito telah menyelesaikan latihan prasyarat",
        },
        {
          isCorrect: false,
          label: "Dito tidak mengikuti tes simulasi",
        },
        {
          isCorrect: true,
          label: "Dito menerima laporan evaluasi",
        },
        {
          isCorrect: false,
          label: "Dito tidak menerima laporan evaluasi",
        },
        {
          isCorrect: false,
          label:
            "Dito telah menyelesaikan latihan prasyarat dan menerima laporan evaluasi",
        },
      ],
    },
  },
};

export default item;
