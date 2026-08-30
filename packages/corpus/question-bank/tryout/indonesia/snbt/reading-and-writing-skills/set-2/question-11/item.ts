import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Entwicklung der indonesischen Landwirtschaft",
        },
        {
          isCorrect: false,
          label: "Der Rückgang landwirtschaftlicher Einzelbetriebe",
        },
        {
          isCorrect: false,
          label:
            "Warum braucht Indonesien eine Modernisierung der Landwirtschaft?",
        },
        {
          isCorrect: true,
          label: "Ein Profil aus Indonesiens Landwirtschaftszählung 2023",
        },
        {
          isCorrect: false,
          label:
            "Die Landwirtschaftszählung 2023 wurde in ganz Indonesien durchgeführt",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The Development of Indonesian Agriculture",
        },
        {
          isCorrect: false,
          label: "The Decline in Individual Agricultural Holdings",
        },
        {
          isCorrect: false,
          label: "Why Does Indonesia Need Agricultural Modernization?",
        },
        {
          isCorrect: true,
          label: "A Profile from Indonesia's 2023 Agricultural Census",
        },
        {
          isCorrect: false,
          label: "The 2023 Agricultural Census Was Conducted Across Indonesia",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Perkembangan Pertanian Indonesia",
        },
        {
          isCorrect: false,
          label: "Penurunan Usaha Pertanian Perorangan",
        },
        {
          isCorrect: false,
          label: "Mengapa Indonesia Memerlukan Modernisasi Pertanian?",
        },
        {
          isCorrect: true,
          label: "Potret dari Sensus Pertanian Indonesia 2023",
        },
        {
          isCorrect: false,
          label: "Sensus Pertanian 2023 Dilaksanakan di Seluruh Indonesia",
        },
      ],
    },
  },
};

export default item;
