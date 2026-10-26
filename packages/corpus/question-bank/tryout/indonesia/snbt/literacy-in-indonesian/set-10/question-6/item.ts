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
            "Air yang keluar dari bawah kolom langsung menunjukkan jumlah air yang masuk dari permukaan, sehingga penyimpanan di dalam tanah tidak perlu dihitung.",
        },
        {
          correct: false,
          label:
            "Campuran organik memiliki infiltrasi terendah karena hanya $$62$$ mililiter air yang keluar dari bawah selama $$15$$ menit.",
        },
        {
          correct: false,
          label:
            "Kolom pasir merupakan model terbaik untuk semua lahan karena seluruh air sudah masuk sebelum lima menit.",
        },
        {
          correct: false,
          label:
            "Perbedaan retensi membuktikan campuran organik selalu mencegah air mencapai lapisan tanah yang lebih dalam.",
        },
        {
          correct: true,
          label:
            "Model membedakan infiltrasi, perkolasi, dan penyimpanan air, tetapi tanah yang dikemas ulang belum mewakili struktur lahan alami.",
        },
      ],
    },
  },
};

export default item;
