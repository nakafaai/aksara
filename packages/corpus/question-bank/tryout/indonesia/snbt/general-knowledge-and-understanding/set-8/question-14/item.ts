import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
          correct: false,
          label:
            "Kalibrasi dilakukan dengan merata-ratakan seluruh laporan tanpa membedakan jumlah kunjungan dan hasil validasi.",
        },
        {
          correct: true,
          label:
            "Kalibrasi menempatkan kontribusi warga dalam ukuran ketidakpastian yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
