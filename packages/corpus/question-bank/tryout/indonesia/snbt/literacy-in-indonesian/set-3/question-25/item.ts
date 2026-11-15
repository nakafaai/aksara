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
            "Dahulu, kereta dari jalur Semarang ke pedalaman tidak dapat langsung berjalan di jalur milik perusahaan pemerintah.",
        },
        {
          column: 2,
          label:
            "Rel selebar $$1{.}435$$ mm masih dipakai di jalur Semarang ke pedalaman sampai sekarang.",
        },
        {
          column: 1,
          label:
            "Sebelum ada rel, lama perjalanan hasil bumi dapat berbeda antara musim kemarau dan musim hujan.",
        },
        {
          column: 2,
          label:
            "Jalur pertama memakai rel lebar agar seragam dengan jaringan milik pemerintah.",
        },
        {
          column: 2,
          label:
            "Pada awalnya, kereta api di jalur itu hanya mengangkut hasil perkebunan.",
        },
      ],
    },
  },
};

export default item;
