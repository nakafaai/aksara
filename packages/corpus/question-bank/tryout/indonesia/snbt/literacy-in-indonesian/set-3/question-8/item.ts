import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bu Tarmi menghapus utang Warsito sebagai salam perpisahan yang tak diucapkan, dan obrolan tentang harga cabai menunjukkan keduanya menghindari kata perpisahan.",
        },
        {
          correct: false,
          label:
            "Bu Tarmi menghapus utang Warsito karena kasihan, dan obrolan tentang harga cabai menunjukkan rumah makannya sedang merugi.",
        },
        {
          correct: false,
          label:
            "Bu Tarmi marah karena Warsito terlambat membayar, dan obrolan tentang harga cabai dipakai untuk menutupi kemarahannya.",
        },
        {
          correct: false,
          label:
            "Bu Tarmi mencatat pembayaran itu di halaman baru, dan obrolan tentang harga cabai menunjukkan hubungan mereka selama ini hanya urusan dagang antara penjual dan pelanggan.",
        },
        {
          correct: false,
          label:
            "Bu Tarmi menyimpan bon itu untuk ditagih kelak, dan obrolan tentang harga cabai menunjukkan ia belum tahu bahwa trayek bus malam itu akan segera ditutup.",
        },
      ],
    },
  },
};

export default item;
