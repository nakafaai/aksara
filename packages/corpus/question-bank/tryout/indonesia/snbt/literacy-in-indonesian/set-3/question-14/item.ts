import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pejalan kaki adalah peminjam, lubang adalah biaya pinjaman yang besar, dan daun adalah rendahnya literasi keuangan warga",
        },
        {
          correct: true,
          label:
            "pejalan kaki adalah peminjam, lubang adalah biaya pinjaman yang besar, dan daun adalah penyajian biaya yang tersebar dan baru lengkap setelah pinjaman disetujui",
        },
        {
          correct: false,
          label:
            "pejalan kaki adalah aplikasi pinjaman, lubang adalah biaya pinjaman yang besar, dan daun adalah penyajian biaya yang tersebar dan baru lengkap setelah pinjaman disetujui",
        },
        {
          correct: false,
          label:
            "pejalan kaki adalah peminjam, lubang adalah aturan pemerintah yang longgar, dan daun adalah penyajian biaya yang tersebar dan baru lengkap setelah pinjaman disetujui",
        },
        {
          correct: false,
          label:
            "pejalan kaki adalah peminjam, lubang adalah biaya pinjaman yang besar, dan daun adalah aturan yang mewajibkan total biaya tampil di satu halaman",
        },
      ],
    },
  },
};

export default item;
