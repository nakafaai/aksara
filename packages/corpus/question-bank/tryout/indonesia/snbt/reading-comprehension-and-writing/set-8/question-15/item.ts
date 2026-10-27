import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Namun, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Oleh karena itu, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Selain itu, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Sebelumnya, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Akibatnya, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
      ],
    },
  },
};

export default item;
