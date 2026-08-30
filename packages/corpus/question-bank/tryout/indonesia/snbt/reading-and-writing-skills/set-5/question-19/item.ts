import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich eine Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: eine Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: eine Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: eine Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: eine Checkliste vor der Aufnahme.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: a checklist used before recording.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: a checklist used before recording.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a checklist used before recording.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: a checklist used before recording.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: a checklist used before recording.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu daftar pemeriksaan sebelum merekam.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu daftar pemeriksaan sebelum merekam.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
