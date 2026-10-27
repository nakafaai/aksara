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
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Oleh karena itu, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Selain itu, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Sebelumnya, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          correct: true,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Namun, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Akibatnya, simpulan tentang peminjaman payung tetap dibatasi.",
        },
      ],
    },
  },
};

export default item;
