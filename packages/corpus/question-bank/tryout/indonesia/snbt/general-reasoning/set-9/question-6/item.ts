import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "antrean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dokter di puskesmas itu pulang lebih awal setiap hari selama bulan Mei.",
        },
        {
          correct: false,
          label:
            "Waktu tunggu pukul 07.00 sampai 08.00 turun dari $$55$$ menjadi $$25$$ menit.",
        },
        {
          correct: true,
          label:
            "Melalui antrean daring, lebih banyak pasien memilih datang menjelang siang.",
        },
        {
          correct: false,
          label:
            "Banyak pasien per hari pada bulan Maret lebih sedikit daripada pada bulan Mei.",
        },
        {
          correct: false,
          label:
            "Ruang tunggu puskesmas itu dicat ulang dengan warna yang lebih terang pada bulan April.",
        },
      ],
    },
  },
};

export default item;
