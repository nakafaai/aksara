import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
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
            "Warga sebenarnya tidak berhati-hati, sehingga wajar jika mereka terjerat seperti pejalan kaki yang lalai.",
        },
        {
          correct: false,
          label:
            "Aplikasi pinjaman sengaja dibuat berbahaya, sehingga warga sebaiknya sama sekali tidak meminjam secara daring dalam keadaan apa pun.",
        },
        {
          correct: false,
          label:
            "Peminjam yang terjerat tidak dapat disalahkan sama sekali, karena semua biaya pinjaman disembunyikan.",
        },
        {
          correct: true,
          label:
            "Kesalahan tidak bisa ditimpakan seluruhnya pada warga, karena biaya pinjaman disajikan dengan cara yang membuatnya sulit terlihat.",
        },
        {
          correct: false,
          label:
            "Edukasi keuangan tidak berguna, karena pejalan kaki yang paham pun tetap akan jatuh ke lubang.",
        },
      ],
    },
  },
};

export default item;
