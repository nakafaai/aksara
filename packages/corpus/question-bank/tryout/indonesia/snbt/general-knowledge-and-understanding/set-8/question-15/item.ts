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
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
        {
          correct: false,
          label: "Daerah tanpa laporan pasti tidak memiliki bibit mangrove.",
        },
        {
          correct: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
        {
          correct: true,
          label:
            "Sebagian pola pada peta awal mungkin mencerminkan perilaku pengamat, bukan hanya perubahan mangrove.",
        },
        {
          correct: false,
          label:
            "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi.",
        },
      ],
    },
  },
};

export default item;
