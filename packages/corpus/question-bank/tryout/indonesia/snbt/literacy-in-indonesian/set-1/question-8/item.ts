import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "class-ranking",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kenaikan nilai seorang siswa dapat tidak tampak dalam peringkatnya.",
        },
        {
          column: 2,
          label:
            "Persaingan antarsiswa akan hilang sepenuhnya jika peringkat dihapus dari rapor.",
        },
        {
          column: 1,
          label:
            "Selisih kecil antarperingkat dapat disalahpahami sebagai perbedaan besar.",
        },
        {
          column: 2,
          label:
            "Rapor yang diusulkan penulis akan mengurangi beban kerja guru.",
        },
      ],
    },
  },
};

export default item;
