import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: die Analyse geplant wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: das Labor benachrichtigt wird.",
        },
        {
          isCorrect: true,
          label: "das Labor benachrichtigt wird",
        },
        {
          isCorrect: false,
          label: "die Analyse geplant wird",
        },
        {
          isCorrect: false,
          label: "Nicht: die Probe registriert wird.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that the analysis is scheduled.",
        },
        {
          isCorrect: false,
          label: "It is not true that the laboratory is notified.",
        },
        {
          isCorrect: true,
          label: "the laboratory is notified",
        },
        {
          isCorrect: false,
          label: "the analysis is scheduled",
        },
        {
          isCorrect: false,
          label: "It is not true that the sample is registered.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa analisis dijadwalkan.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa laboratorium diberi tahu.",
        },
        {
          isCorrect: true,
          label: "laboratorium diberi tahu",
        },
        {
          isCorrect: false,
          label: "analisis dijadwalkan",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa sampel didaftarkan.",
        },
      ],
    },
  },
};

export default item;
