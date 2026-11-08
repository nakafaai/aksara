import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "rasa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Biaya produksi resep baru lebih murah daripada biaya produksi resep lama di semua pabrik produsen itu.",
        },
        {
          correct: false,
          label:
            "Peserta tidak diberi tahu minuman mana yang menggunakan resep baru.",
        },
        {
          correct: false,
          label:
            "Seluruh peserta dipilih secara acak dari pengunjung pusat perbelanjaan pada hari kerja dan akhir pekan.",
        },
        {
          correct: true,
          label:
            "Selera rasa manis di banyak daerah lain di Indonesia sangat berbeda dengan selera warga Kota Bandung.",
        },
        {
          correct: false,
          label:
            "Kemasan minuman dengan resep baru dibuat sama persis dengan kemasan lama.",
        },
      ],
    },
  },
};

export default item;
