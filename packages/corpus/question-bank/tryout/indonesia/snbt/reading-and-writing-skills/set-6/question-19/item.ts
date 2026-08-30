import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team changed only one factor: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: an example showing how to record sound duration.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu contoh cara mencatat durasi suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
