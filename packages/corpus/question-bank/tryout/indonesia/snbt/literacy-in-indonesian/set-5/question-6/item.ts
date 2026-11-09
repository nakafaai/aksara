import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "social-media-age",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Batas usia ada gunanya, tetapi tidak cukup tanpa kewajiban rancangan bagi platform.",
        },
        {
          correct: false,
          label:
            "Batas usia sebaiknya dihapus karena remaja berhak memakai media sosial seperti orang dewasa.",
        },
        {
          correct: false,
          label:
            "Batas usia akan efektif asalkan setiap pengguna diwajibkan mengunggah kartu identitas.",
        },
        {
          correct: false,
          label:
            "Batas usia sebaiknya diserahkan sepenuhnya kepada keluarga dan sekolah masing-masing.",
        },
        {
          correct: false,
          label:
            "Batas usia mungkin berhasil jika diterapkan bersamaan oleh semua negara di dunia.",
        },
      ],
    },
  },
};

export default item;
