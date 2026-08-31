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
          isCorrect: false,
          label: "verringert.",
        },
        {
          isCorrect: true,
          label: "hoch.",
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
          isCorrect: false,
          label: "reduced.",
        },
        {
          isCorrect: true,
          label: "high.",
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
          isCorrect: false,
          label: "berkurang.",
        },
        {
          isCorrect: true,
          label: "tinggi.",
        },
      ],
    },
  },
};

export default item;
