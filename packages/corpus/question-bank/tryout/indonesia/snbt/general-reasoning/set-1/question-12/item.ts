import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Gudang tidak menerima kiriman beras pada hari Senin minggu ini.",
        },
        {
          correct: false,
          label: "Petugas menimbang ulang semua karung minggu ini.",
        },
        {
          correct: false,
          label: "Laporan stok terlambat dikirim minggu ini.",
        },
        {
          correct: false,
          label:
            "Gudang menerima kiriman beras pada hari selain Senin minggu ini.",
        },
        {
          correct: false,
          label:
            "Kepala gudang tidak akan menelepon pemasok pada minggu depan.",
        },
      ],
    },
  },
};

export default item;
