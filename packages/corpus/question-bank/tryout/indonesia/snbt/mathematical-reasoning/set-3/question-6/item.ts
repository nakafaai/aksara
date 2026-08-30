import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Erstes Angebot",
        },
        {
          isCorrect: true,
          label: "Zweites Angebot",
        },
        {
          isCorrect: false,
          label: "Beide Angebote sind gleichwertig",
        },
        {
          isCorrect: false,
          label: "Das erste Angebot ist doppelt so groß",
        },
        {
          isCorrect: false,
          label: "Kann nicht bestimmt werden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "First offer" },
        { isCorrect: true, label: "Second offer" },
        {
          isCorrect: false,
          label: "Both offers are equal",
        },
        {
          isCorrect: false,
          label: "First offer is twice as large",
        },
        {
          isCorrect: false,
          label: "Cannot be determined",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tawaran pertama",
        },
        { isCorrect: true, label: "Tawaran kedua" },
        {
          isCorrect: false,
          label: "Kedua tawaran sama besar",
        },
        {
          isCorrect: false,
          label: "Tawaran pertama dua kali lebih besar",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
