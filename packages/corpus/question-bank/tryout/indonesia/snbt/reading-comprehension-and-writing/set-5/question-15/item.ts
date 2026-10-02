import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Oleh karena itu, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Selain itu, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Namun, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Sebelumnya, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Akibatnya, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
