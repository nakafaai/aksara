import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dito hat die vorausgesetzten Übungen abgeschlossen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Dito hat am Übungstest teilgenommen" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito ist kein Lernender" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dito hat die vorausgesetzten Übungen nicht abgeschlossen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dito hat einen Auswertungsbericht erhalten",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Dito completed the prerequisite exercises" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito took the practice test" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito is not a student" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dito did not complete the prerequisite exercises",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito received an evaluation report" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Dito menyelesaikan latihan prasyarat" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito mengikuti tes latihan" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito bukan seorang siswa" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dito tidak menyelesaikan latihan prasyarat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito menerima laporan evaluasi" }],
        },
      ],
    },
  },
};

export default item;
