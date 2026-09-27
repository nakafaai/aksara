import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Survei lapangan acak menemukan bahwa peta yang telah disesuaikan dengan intensitas kunjungan memprediksi kepadatan bibit dengan baik.",
        },
        {
          isCorrect: false,
          label:
            "Tanda pengenal relawan meningkatkan jumlah laporan di jalur populer tanpa menambah cakupan pada area yang jarang dikunjungi.",
        },
        {
          isCorrect: true,
          label:
            "Survei acak menunjukkan peluang kunjungan dan ketepatan klasifikasi sama di semua lokasi sejak pencatatan dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
        {
          isCorrect: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
