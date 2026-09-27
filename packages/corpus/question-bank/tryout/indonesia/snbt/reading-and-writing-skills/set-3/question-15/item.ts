import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Oleh karena itu, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Selain itu, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata hasil uji lebih tinggi. Namun, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Sebelumnya, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Akibatnya, simpulannya tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
