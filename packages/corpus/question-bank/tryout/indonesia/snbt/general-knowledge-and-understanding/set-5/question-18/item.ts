import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "pinisi",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Kapal pinisi disusun berdasarkan gambar rancangan yang terperinci.",
        },
        {
          column: 1,
          label:
            "Pembuatan kapal pinisi dipimpin oleh seorang ahli yang disebut panrita lopi.",
        },
        {
          column: 1,
          label:
            "Kayu yang cocok untuk lambung kapal pinisi dilaporkan makin sulit diperoleh.",
        },
        {
          column: 2,
          label:
            "Sebagian besar kapal pinisi baru dipakai untuk mengangkut barang dagangan.",
        },
      ],
    },
  },
};

export default item;
