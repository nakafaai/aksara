import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nicht: die Prüfung stattfindet.",
        },
        {
          isCorrect: true,
          label: "die Besprechung stattfindet",
        },
        {
          isCorrect: false,
          label: "Nicht: der Bericht eingereicht wird.",
        },
        {
          isCorrect: false,
          label: "Nicht: die Besprechung stattfindet.",
        },
        {
          isCorrect: false,
          label: "der Bericht eingereicht wird",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "It is not true that the inspection occurs.",
        },
        {
          isCorrect: true,
          label: "the meeting takes place",
        },
        {
          isCorrect: false,
          label: "It is not true that the report is submitted.",
        },
        {
          isCorrect: false,
          label: "It is not true that the meeting takes place.",
        },
        {
          isCorrect: false,
          label: "the report is submitted",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tidak benar bahwa pemeriksaan berlangsung.",
        },
        {
          isCorrect: true,
          label: "rapat berlangsung",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa laporan diserahkan.",
        },
        {
          isCorrect: false,
          label: "Tidak benar bahwa rapat berlangsung.",
        },
        {
          isCorrect: false,
          label: "laporan diserahkan",
        },
      ],
    },
  },
};

export default item;
