import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Namun, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Oleh karena itu, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Selain itu, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Sebelumnya, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
        {
          isCorrect: false,
          label:
            "Nilai pengunjung yang sampai tanpa bertanya lagi lebih tinggi. Akibatnya, simpulan tetap dibatasi pada uji singkat di satu pintu masuk taman.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
