import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teks B menolak edukasi keuangan, karena menganggap edukasi tidak berguna bagi peminjam.",
        },
        {
          correct: false,
          label:
            "Teks B menerima bahwa literasi rendah adalah akar masalah, tetapi menilai edukasi di sekolah terlalu lambat untuk menolong warga.",
        },
        {
          correct: false,
          label:
            "Teks B menolak survei Teks A seluruhnya, karena menganggap survei itu memakai data palsu.",
        },
        {
          correct: false,
          label:
            "Teks B setuju dengan Teks A bahwa semua biaya pinjaman sudah terbuka dan mudah dibaca warga.",
        },
        {
          correct: true,
          label:
            "Teks B menerima manfaat edukasi, tetapi meragukan bukti Teks A dan menilai rancangan produk serta pengawasan lebih mendesak.",
        },
      ],
    },
  },
};

export default item;
