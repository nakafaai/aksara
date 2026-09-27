import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Oleh karena itu, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Selain itu, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Sebelumnya, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Namun, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Akibatnya, simpulan tentang peminjaman payung tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
