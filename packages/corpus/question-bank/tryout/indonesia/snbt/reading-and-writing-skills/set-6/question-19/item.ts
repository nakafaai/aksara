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
            "Das Team änderte nur ein Faktor: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: ein Beispiel zur Erfassung der Geräuschdauer.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: ein Beispiel zur Erfassung der Geräuschdauer.",
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
            "The team changed only one factors: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: an example showing how to record sound duration.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely an example showing how to record sound duration.",
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
            "Tim mengubahkan satu faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu contoh cara mencatat durasi suara.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
