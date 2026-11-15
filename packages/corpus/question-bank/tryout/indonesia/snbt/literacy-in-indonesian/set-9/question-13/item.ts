import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "street-vendors",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hanya pemerintah kota, karena lapak gratis selama enam bulan menghabiskan anggaran.",
        },
        {
          correct: true,
          label:
            "Pedagang, karena pendapatannya bisa turun seperti di Pasar Baru, dan akhirnya juga pejalan kaki, karena pedagang yang kembali berjualan di jalan akan memakai trotoar lagi.",
        },
        {
          correct: false,
          label:
            "Pedagang, karena pendapatannya bisa turun, sedangkan pejalan kaki pasti tetap diuntungkan karena trotoar akan tetap kosong.",
        },
        {
          correct: false,
          label:
            "Pembeli, karena harga makanan di Pasar Sentra pasti lebih mahal daripada di trotoar.",
        },
        {
          correct: false,
          label:
            "Tidak ada yang dirugikan, karena halte bus akan dipindahkan ke depan pasar tujuan.",
        },
      ],
    },
  },
};

export default item;
