import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die Ergänzung strukturierter Ortsangaben im Formular.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die Ergänzung strukturierter Ortsangaben im Formular.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die Ergänzung strukturierter Ortsangaben im Formular.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die Ergänzung strukturierter Ortsangaben im Formular.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktoren: die Ergänzung strukturierter Ortsangaben im Formular.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: adding structured location choices to the form.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: adding structured location choices to the form.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: adding structured location choices to the form.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: adding structured location choices to the form.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely adding structured location choices to the form.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penambahan pilihan lokasi terstruktur pada formulir.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penambahan pilihan lokasi terstruktur pada formulir.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penambahan pilihan lokasi terstruktur pada formulir.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penambahan pilihan lokasi terstruktur pada formulir.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penambahan pilihan lokasi terstruktur pada formulir.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
