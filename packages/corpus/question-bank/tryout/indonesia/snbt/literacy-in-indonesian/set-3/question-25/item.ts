import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dahulu, kereta dari jalur Semarang ke pedalaman tidak dapat langsung berjalan di jalur yang dibangun perusahaan milik pemerintah.",
        },
        {
          column: 1,
          label:
            "Barang yang berpindah antarjalur dengan lebar rel berbeda harus dipindahkan di stasiun pertemuan.",
        },
        {
          column: 2,
          label:
            "Rel selebar $$1{.}435$$ mm masih dipakai di jalur Semarang ke pedalaman sampai sekarang.",
        },
        {
          column: 1,
          label:
            "Sebelum ada rel, mengangkut hasil bumi lebih sulit pada musim hujan.",
        },
        {
          column: 2,
          label:
            "Jalur pertama dibangun dengan rel lebar agar seragam dengan jaringan milik pemerintah.",
        },
      ],
    },
  },
};

export default item;
