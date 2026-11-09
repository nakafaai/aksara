import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "recorded-lectures",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Teks 1 menyebut rekaman membantu mahasiswa yang bekerja paruh waktu.",
        },
        {
          column: 2,
          label: "Teks 2 menolak penggunaan rekaman kuliah sama sekali.",
        },
        {
          column: 1,
          label:
            "Menurut Teks 2, banyak mahasiswa menunda menonton rekaman sampai menjelang ujian.",
        },
        {
          column: 2,
          label:
            "Teks 1 mengusulkan agar kegiatan di kelas dihapus seluruhnya.",
        },
      ],
    },
  },
};

export default item;
