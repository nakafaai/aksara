import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "eng." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "hoch." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "begrenzt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "klein." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "verringert." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "narrow." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "high." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "limited." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "small." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "reduced." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "sempit." }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "tinggi." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "terbatas." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "kecil." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "berkurang." }],
        },
      ],
    },
  },
};

export default item;
