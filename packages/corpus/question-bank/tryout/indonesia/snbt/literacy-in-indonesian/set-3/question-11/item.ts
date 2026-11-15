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
            "Teks B menerima manfaat edukasi dan bukti survei Teks A, tetapi menilai aturan tampilan biaya lebih mendesak.",
        },
        {
          correct: false,
          label:
            "Teks B meragukan bukti survei Teks A, dan karena itu menolak edukasi keuangan sebagai langkah yang sia-sia.",
        },
        {
          correct: false,
          label:
            "Teks B menerima bahwa literasi rendah adalah akar masalah, tetapi menilai edukasi di sekolah terlalu lambat untuk menolong warga.",
        },
        {
          correct: false,
          label:
            "Teks B membantah angka bunga Teks A, karena bunga sebenarnya dihitung dari uang yang diterima peminjam.",
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
