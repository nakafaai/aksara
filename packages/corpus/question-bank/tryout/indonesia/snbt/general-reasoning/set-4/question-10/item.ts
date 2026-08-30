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
            { kind: "text", text: "Dito nimmt nicht an einem Probetest teil" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Dito erhält keinen Auswertungsbericht" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Dito erhält einen Auswertungsbericht" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dito hat die vorausgesetzten Übungen abgeschlossen und erhält einen Auswertungsbericht",
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
          label: [{ kind: "text", text: "Dito did not take a mock test" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito receives no evaluation report" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Dito receives an evaluation report" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dito completed the prerequisite exercises and receives an evaluation report",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dito telah menyelesaikan latihan prasyarat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Dito tidak mengikuti tes simulasi" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Dito tidak menerima laporan evaluasi" },
          ],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Dito menerima laporan evaluasi" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dito telah menyelesaikan latihan prasyarat dan menerima laporan evaluasi",
            },
          ],
        },
      ],
    },
  },
};

export default item;
