import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "bakau",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Akar mangrove membantu menahan lumpur di tepi pantai.",
        },
        {
          column: 2,
          label:
            "Penanaman kembali mangrove selalu berhasil di pesisir mana pun.",
        },
        {
          column: 1,
          label:
            "Tambak yang dibuat dengan menebang mangrove lebih mudah terkikis gelombang.",
        },
        {
          column: 2,
          label:
            "Pemecah ombak bambu dipasang untuk menggantikan hutan mangrove secara permanen.",
        },
      ],
    },
  },
};

export default item;
