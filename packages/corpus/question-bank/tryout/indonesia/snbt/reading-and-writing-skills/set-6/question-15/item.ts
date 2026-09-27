import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Oleh karena itu, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Selain itu, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Sebelumnya, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Namun, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Akibatnya, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
