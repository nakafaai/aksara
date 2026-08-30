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
              text: "Die Seitenlage kann bei manchen Menschen das Schnarchen verringern",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In Rückenlage können sich die Atemwege bei manchen Menschen verengen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Schnarchen kann andere Ursachen als die Schlafposition haben",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Seitenlage beendet garantiert jedes Schnarchen und macht eine ärztliche Abklärung überflüssig",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Schnarchen mit Atempausen, Luftschnappen oder Erstickungsgefühlen sollte ärztlich abgeklärt werden",
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
            {
              kind: "text",
              text: "Side sleeping may help reduce snoring for some people",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Back sleeping can narrow the airway in some people",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Snoring can have causes other than sleep position",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Side sleeping guarantees that all snoring will stop and makes medical assessment unnecessary",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Snoring with breathing pauses, gasping, or choking should be medically assessed",
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
              text: "Tidur menyamping dapat membantu mengurangi dengkuran pada sebagian orang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidur telentang dapat mempersempit jalan napas pada sebagian orang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dengkuran dapat disebabkan oleh faktor selain posisi tidur",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Tidur menyamping menjamin semua dengkuran berhenti dan membuat pemeriksaan medis tidak diperlukan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dengkuran yang disertai jeda napas, terengah-engah, atau tersedak perlu diperiksakan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
