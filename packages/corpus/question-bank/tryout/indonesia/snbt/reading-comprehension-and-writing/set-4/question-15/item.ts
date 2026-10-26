import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Oleh karena itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Selain itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Sebelumnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Akibatnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          correct: true,
          label:
            "Rata-rata sesi uji lebih tinggi. Namun, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
