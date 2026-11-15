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
            "Warga tetap sepenuhnya bertanggung jawab, karena lubang yang tertutup daun masih dapat dilihat oleh orang yang berhati-hati.",
        },
        {
          correct: false,
          label:
            "Biaya pinjaman sebenarnya kecil, tetapi warga salah menghitungnya karena tidak memahami bunga harian.",
        },
        {
          correct: false,
          label:
            "Kesalahan terletak pada pemerintah, karena pemerintahlah yang seharusnya menutup lubang itu dengan aturan.",
        },
        {
          correct: true,
          label:
            "Kesalahan tidak bisa ditimpakan seluruhnya pada warga, karena biaya pinjaman disajikan dengan cara yang membuatnya sulit terlihat.",
        },
        {
          correct: false,
          label:
            "Aplikasi menyembunyikan seluruh biaya, sehingga tidak ada angka biaya yang tercantum di aplikasi itu.",
        },
      ],
    },
  },
};

export default item;
