import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eng.",
        },
        {
          isCorrect: false,
          label: "begrenzt.",
        },
        {
          isCorrect: false,
          label: "klein.",
        },
        {
          isCorrect: true,
          label: "hoch.",
        },
        {
          isCorrect: false,
          label: "verringert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "narrow.",
        },
        {
          isCorrect: false,
          label: "limited.",
        },
        {
          isCorrect: false,
          label: "small.",
        },
        {
          isCorrect: true,
          label: "high.",
        },
        {
          isCorrect: false,
          label: "reduced.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sempit.",
        },
        {
          isCorrect: false,
          label: "terbatas.",
        },
        {
          isCorrect: false,
          label: "kecil.",
        },
        {
          isCorrect: true,
          label: "tinggi.",
        },
        {
          isCorrect: false,
          label: "berkurang.",
        },
      ],
    },
  },
};

export default item;
