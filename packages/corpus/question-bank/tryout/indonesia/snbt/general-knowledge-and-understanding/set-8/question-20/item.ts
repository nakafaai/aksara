import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Survei lapangan acak menemukan bahwa peta yang telah disesuaikan dengan intensitas kunjungan memprediksi kepadatan bibit dengan baik.",
        },
        {
          correct: false,
          label:
            "Tanda pengenal relawan meningkatkan jumlah laporan di jalur populer tanpa menambah cakupan pada area yang jarang dikunjungi.",
        },
        {
          correct: true,
          label:
            "Survei acak menunjukkan peluang kunjungan dan ketepatan klasifikasi sama di semua lokasi sejak pencatatan dimulai.",
        },
        {
          correct: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
        {
          correct: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
