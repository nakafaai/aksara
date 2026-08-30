import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: einen nach Absagen aktualisierten digitalen Plan.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: einen nach Absagen aktualisierten digitalen Plan.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a digital schedule updated after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: a digital schedule updated after cancellations.",
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
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu jadwal digital yang diperbarui setelah pembatalan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
