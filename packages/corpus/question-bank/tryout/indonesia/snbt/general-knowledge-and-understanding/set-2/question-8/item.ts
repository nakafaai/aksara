import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "antibiotik",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Karena golongan antibiotik baru sudah lama jarang ditemukan, dunia kesehatan kini berhenti mencarinya dan beralih menjaga obat yang ada.",
        },
        {
          column: 1,
          label:
            "Seseorang yang belum pernah meminum antibiotik tetap dapat terinfeksi bakteri yang resistan.",
        },
        {
          column: 1,
          label:
            "Gen resistansi yang muncul pada bakteri di tubuh seseorang dapat sampai ke jenis bakteri lain di tubuh orang lain.",
        },
        {
          column: 2,
          label:
            "Karena aturannya mewajibkan resep, antibiotik di Indonesia hanya dapat diperoleh dengan resep dokter.",
        },
      ],
    },
  },
};

export default item;
