import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die sofortige Aktualisierung eines digitalen Plans nach Absagen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die sofortige Aktualisierung eines digitalen Plans nach Absagen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die sofortige Aktualisierung eines digitalen Plans nach Absagen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die sofortige Aktualisierung eines digitalen Plans nach Absagen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktoren: die sofortige Aktualisierung eines digitalen Plans nach Absagen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: using a digital schedule updated immediately after cancellations.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: using a digital schedule updated immediately after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: using a digital schedule updated immediately after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: using a digital schedule updated immediately after cancellations.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely using a digital schedule updated immediately after cancellations.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
