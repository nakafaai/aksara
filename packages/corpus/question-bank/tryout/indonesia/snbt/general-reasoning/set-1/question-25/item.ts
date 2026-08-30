import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Seitenlage kann bei manchen Menschen das Schnarchen verringern",
        },
        {
          isCorrect: false,
          label:
            "In Rückenlage können sich die Atemwege bei manchen Menschen verengen",
        },
        {
          isCorrect: false,
          label: "Schnarchen kann andere Ursachen als die Schlafposition haben",
        },
        {
          isCorrect: true,
          label:
            "Die Seitenlage beendet garantiert jedes Schnarchen und macht eine ärztliche Abklärung überflüssig",
        },
        {
          isCorrect: false,
          label:
            "Schnarchen mit Atempausen, Luftschnappen oder Erstickungsgefühlen sollte ärztlich abgeklärt werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Side sleeping may help reduce snoring for some people",
        },
        {
          isCorrect: false,
          label: "Back sleeping can narrow the airway in some people",
        },
        {
          isCorrect: false,
          label: "Snoring can have causes other than sleep position",
        },
        {
          isCorrect: true,
          label:
            "Side sleeping guarantees that all snoring will stop and makes medical assessment unnecessary",
        },
        {
          isCorrect: false,
          label:
            "Snoring with breathing pauses, gasping, or choking should be medically assessed",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tidur menyamping dapat membantu mengurangi dengkuran pada sebagian orang",
        },
        {
          isCorrect: false,
          label:
            "Tidur telentang dapat mempersempit jalan napas pada sebagian orang",
        },
        {
          isCorrect: false,
          label: "Dengkuran dapat disebabkan oleh faktor selain posisi tidur",
        },
        {
          isCorrect: true,
          label:
            "Tidur menyamping menjamin semua dengkuran berhenti dan membuat pemeriksaan medis tidak diperlukan",
        },
        {
          isCorrect: false,
          label:
            "Dengkuran yang disertai jeda napas, terengah-engah, atau tersedak perlu diperiksakan",
        },
      ],
    },
  },
};

export default item;
