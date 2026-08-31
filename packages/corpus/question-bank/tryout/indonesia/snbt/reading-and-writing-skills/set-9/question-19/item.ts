import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: einen nach Absagen aktualisierten digitalen Plan.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely a digital schedule updated after cancellations.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
