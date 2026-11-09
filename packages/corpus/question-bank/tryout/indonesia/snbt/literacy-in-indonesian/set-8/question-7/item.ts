import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "school-distance",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Penulis mengusulkan agar aturan penerimaan berdasarkan jarak dihapus.",
        },
        {
          column: 1,
          label: "Menurut penulis, sekolah negeri tidak tersebar merata.",
        },
        {
          column: 1,
          label:
            "Penulis menyebut keluarga yang jujur dirugikan oleh pemindahan alamat.",
        },
        {
          column: 2,
          label:
            "Penulis mengusulkan agar nilai kembali menjadi satu-satunya dasar penerimaan.",
        },
      ],
    },
  },
};

export default item;
