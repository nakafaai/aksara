import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Namun, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          correct: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Oleh karena itu, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          correct: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Selain itu, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          correct: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Sebelumnya, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          correct: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Akibatnya, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
