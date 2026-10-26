import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Oleh karena itu, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Selain itu, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Sebelumnya, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          correct: true,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Namun, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          correct: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Akibatnya, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
