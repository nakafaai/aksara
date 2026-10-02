import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Data warga dapat mendukung pemantauan mangrove jika peluang pengamatan dan ketepatan klasifikasi dikalibrasi.",
        },
        {
          isCorrect: true,
          label:
            "Lokasi dekat jalan memiliki banyak laporan sekaligus paling mudah dikunjungi.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian relawan mengusulkan agar seluruh pengamatan langsung dimasukkan tanpa pemeriksaan karena jumlah data akan lebih besar.",
        },
        {
          isCorrect: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
        {
          isCorrect: false,
          label:
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
