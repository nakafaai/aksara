import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "science-language",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedua penulis sepakat bahwa artikel berbahasa Inggris dapat menjangkau lebih banyak peneliti di luar negeri.",
        },
        {
          column: 1,
          label: "Penulis Teks B tidak menolak publikasi dalam bahasa Inggris.",
        },
        {
          column: 2,
          label:
            "Penulis Teks A menyatakan bahwa bahasa Indonesia tidak mampu menjadi bahasa ilmu.",
        },
        {
          column: 1,
          label:
            "Menurut Teks B, jumlah sitasi tidak mengukur manfaat penelitian bagi pemakai yang bukan peneliti.",
        },
      ],
    },
  },
};

export default item;
