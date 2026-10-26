import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Laporan Mira tidak lulus pemeriksaan kelengkapan.",
        },
        {
          correct: false,
          label: "Pengajuan Mira sudah disetujui.",
        },
        {
          correct: false,
          label: "Penelaahan analis dilewati untuk laporan Mira.",
        },
        {
          correct: false,
          label:
            "Setiap laporan dalam antrean akhir disetujui secara otomatis.",
        },
        {
          correct: true,
          label: "Laporan Mira masuk ke antrean keputusan akhir.",
        },
      ],
    },
  },
};

export default item;
