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
              text: "Die Entwicklung der indonesischen Landwirtschaft",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Ein Profil aus Indonesiens Landwirtschaftszählung 2023",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Rückgang landwirtschaftlicher Einzelbetriebe",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Warum braucht Indonesien eine Modernisierung der Landwirtschaft?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Landwirtschaftszählung 2023 wurde in ganz Indonesien durchgeführt",
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
            { kind: "text", text: "The Development of Indonesian Agriculture" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A Profile from Indonesia's 2023 Agricultural Census",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The Decline in Individual Agricultural Holdings",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Why Does Indonesia Need Agricultural Modernization?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The 2023 Agricultural Census Was Conducted Across Indonesia",
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
          label: [{ kind: "text", text: "Perkembangan Pertanian Indonesia" }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Potret dari Sensus Pertanian Indonesia 2023",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Penurunan Usaha Pertanian Perorangan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengapa Indonesia Memerlukan Modernisasi Pertanian?",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sensus Pertanian 2023 Dilaksanakan di Seluruh Indonesia",
            },
          ],
        },
      ],
    },
  },
};

export default item;
