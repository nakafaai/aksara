import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die Ergänzung eines Rückgabecodes an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die Ergänzung eines Rückgabecodes an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die Ergänzung eines Rückgabecodes an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktoren: die Ergänzung eines Rückgabecodes an jedem Griff.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die Ergänzung eines Rückgabecodes an jedem Griff.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: adding a return code to each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: adding a return code to each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: adding a return code to each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely adding a return code to each handle.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: adding a return code to each handle.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
