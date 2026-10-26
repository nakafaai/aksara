import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Musim tanam petani atau musim rendeng menjadi tidak menentu serta petani kekurangan bibit dan pupuk",
        },
        {
          correct: false,
          label:
            "Realisasi pengadaan beras semakin tidak optimal dan pemerintah terpaksa melakukan impor beras",
        },
        {
          correct: true,
          label:
            "Stok beras pemerintah atau CBP (cadangan beras pemerintah) akan terancam berkurang",
        },
        {
          correct: false,
          label:
            "Bantuan beras Rastra beralih menjadi bantuan pangan nontunai melalui BPNT",
        },
        {
          correct: false,
          label:
            "HPP (harga pembelian pemerintah) menjadi semakin rendah dibandingkan dengan harga di pasar",
        },
      ],
    },
  },
};

export default item;
