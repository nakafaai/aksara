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
            "Data warga dapat mendukung pemantauan mangrove jika peluang pengamatan dan ketepatan klasifikasi dikalibrasi.",
        },
        {
          correct: true,
          label:
            "Lokasi dekat jalan memiliki banyak laporan sekaligus paling mudah dikunjungi.",
        },
        {
          correct: false,
          label:
            "Sebagian relawan mengusulkan agar seluruh pengamatan langsung dimasukkan tanpa pemeriksaan karena jumlah data akan lebih besar.",
        },
        {
          correct: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
        {
          correct: false,
          label:
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
      ],
    },
  },
};

export default item;
