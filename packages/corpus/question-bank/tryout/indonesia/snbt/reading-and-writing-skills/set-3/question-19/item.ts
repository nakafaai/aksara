import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die Verwendung von Bildkarten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die Verwendung von Bildkarten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die Verwendung von Bildkarten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: die Verwendung von Bildkarten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die Verwendung von Bildkarten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: the use of illustrated cards.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: the use of illustrated cards.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: the use of illustrated cards.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely the use of illustrated cards.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: the use of illustrated cards.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penggunaan kartu bergambar.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
