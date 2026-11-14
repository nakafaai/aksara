import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      columns: ["Pasti benar", "Tidak pasti benar"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pendaftar yang fasih berbahasa Inggris tidak ada yang terlambat menyerahkan berkas.",
        },
        {
          column: 2,
          label:
            "Pendaftar yang pernah menjadi relawan museum tidak ada yang terlambat menyerahkan berkas.",
        },
        {
          column: 2,
          label: "Semua pendaftar yang lulus tes sejarah dipanggil wawancara.",
        },
        {
          column: 1,
          label:
            "Sebagian pendaftar yang lulus tes sejarah pernah menjadi relawan museum.",
        },
      ],
    },
  },
};

export default item;
