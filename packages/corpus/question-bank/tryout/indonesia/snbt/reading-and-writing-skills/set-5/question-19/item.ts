import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die Nutzung einer Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die Nutzung einer Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die Nutzung einer Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktoren: die Nutzung einer Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die Nutzung einer Checkliste vor der Aufnahme.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: use of a checklist before recording.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: use of a checklist before recording.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: use of a checklist before recording.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely use of a checklist before recording.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: use of a checklist before recording.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penggunaan daftar pemeriksaan sebelum merekam.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
