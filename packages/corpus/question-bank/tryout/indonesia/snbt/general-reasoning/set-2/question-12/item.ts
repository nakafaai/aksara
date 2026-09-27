import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Musim tanam petani atau musim rendeng menjadi tidak menentu serta petani kekurangan bibit dan pupuk",
        },
        {
          isCorrect: false,
          label:
            "Realisasi pengadaan beras semakin tidak optimal dan pemerintah terpaksa melakukan impor beras",
        },
        {
          isCorrect: true,
          label:
            "Stok beras pemerintah atau CBP (cadangan beras pemerintah) akan terancam berkurang",
        },
        {
          isCorrect: false,
          label:
            "Bantuan beras Rastra beralih menjadi bantuan pangan nontunai melalui BPNT",
        },
        {
          isCorrect: false,
          label:
            "HPP (harga pembelian pemerintah) menjadi semakin rendah dibandingkan dengan harga di pasar",
        },
      ],
    },
  },
};

export default item;
