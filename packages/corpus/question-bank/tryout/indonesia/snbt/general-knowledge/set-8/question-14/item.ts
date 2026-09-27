import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah.",
        },
        {
          isCorrect: false,
          label: "Daerah tanpa laporan pasti tidak memiliki bibit mangrove.",
        },
        {
          isCorrect: false,
          label: "Kesepakatan pada foto saat air pasang tetap lebih rendah.",
        },
        {
          isCorrect: false,
          label:
            "Kalibrasi dilakukan dengan merata-ratakan seluruh laporan tanpa membedakan jumlah kunjungan dan hasil validasi.",
        },
        {
          isCorrect: true,
          label:
            "Kalibrasi menempatkan kontribusi warga dalam ukuran ketidakpastian yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
