import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Oleh karena itu, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Selain itu, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          correct: true,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Namun, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Sebelumnya, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Akibatnya, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
