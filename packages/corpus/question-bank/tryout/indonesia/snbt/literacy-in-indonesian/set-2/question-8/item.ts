import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "unpaid-internship",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pengalaman kerja yang berharga tidak menghapus kewajiban menghargai kerja mahasiswa magang.",
        },
        {
          column: 2,
          label:
            "Lembaga nirlaba yang tidak mampu membayar tidak boleh menerima mahasiswa magang.",
        },
        {
          column: 1,
          label:
            "Magang tanpa upah dapat menjadikan pengalaman kerja hak istimewa mahasiswa dari keluarga mampu.",
        },
        {
          column: 2,
          label:
            "Kampus sebaiknya mengakui setiap kegiatan magang sebagai satuan kredit semester.",
        },
      ],
    },
  },
};

export default item;
