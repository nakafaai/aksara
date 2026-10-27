import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Oleh karena itu, simpulannya tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Selain itu, simpulannya tetap dibatasi.",
        },
        {
          correct: true,
          label:
            "Rata-rata hasil uji lebih tinggi. Namun, simpulannya tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Sebelumnya, simpulannya tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Akibatnya, simpulannya tetap dibatasi.",
        },
      ],
    },
  },
};

export default item;
