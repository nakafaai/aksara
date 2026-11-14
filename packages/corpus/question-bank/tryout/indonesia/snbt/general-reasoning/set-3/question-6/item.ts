import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "bangsal",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setelah sif malam dibagi dua, perawat malam lebih segar sehingga lebih jarang salah mencatat.",
        },
        {
          correct: false,
          label:
            "Mulai April, tim mutu memakai daftar periksa yang lebih rinci sehingga lebih banyak kesalahan kecil ikut terhitung.",
        },
        {
          correct: false,
          label:
            "Pada April sampai Juni, pemberian obat pada malam hari sekitar $$10\\%$$ lebih sedikit daripada pada Januari sampai Maret.",
        },
        {
          correct: false,
          label:
            "Pada April sampai Juni, lebih banyak pasien baru masuk bangsal pada malam hari sehingga pemberian obat pada malam hari bertambah.",
        },
        {
          correct: true,
          label:
            "Mulai April, dokter memindahkan jadwal obat rutin pukul 05.00 ke pukul 08.00 sehingga pemberian obat pada malam hari berkurang sekitar seperempat.",
        },
      ],
    },
  },
};

export default item;
