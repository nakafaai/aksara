import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Namun, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Oleh karena itu, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Selain itu, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Sebelumnya, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Akibatnya, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
