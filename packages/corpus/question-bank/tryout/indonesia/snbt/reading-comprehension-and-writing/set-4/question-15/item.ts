import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Oleh karena itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Selain itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Sebelumnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Akibatnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata sesi uji lebih tinggi. Namun, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
