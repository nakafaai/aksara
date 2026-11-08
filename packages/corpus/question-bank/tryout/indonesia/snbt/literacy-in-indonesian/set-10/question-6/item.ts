import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "front-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Peringatan sederhana di depan kemasan lebih berguna dan perlu diwajibkan.",
        },
        {
          correct: false,
          label:
            "Tabel informasi nilai gizi di belakang kemasan sebaiknya dihapus saja.",
        },
        {
          correct: false,
          label:
            "Cile berhasil menghapus semua minuman manis dari pasaran sejak 2016.",
        },
        {
          correct: false,
          label:
            "Logo sukarela lebih efektif daripada tanda peringatan yang diwajibkan.",
        },
        {
          correct: false,
          label:
            "Pembeli perlu belajar menghitung angka kecukupan gizi sebelum mulai berbelanja.",
        },
      ],
    },
  },
};

export default item;
