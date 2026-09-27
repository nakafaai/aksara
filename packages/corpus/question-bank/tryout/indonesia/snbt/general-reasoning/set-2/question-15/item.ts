import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Harga pembelian pemerintah untuk GKP tetap dan tidak berubah dari Januari sampai April",
        },
        {
          isCorrect: false,
          label:
            "Harga pembelian pemerintah terhadap gabah, GKP, petani selalu mengalami penurunan dari Januari hingga April",
        },
        {
          isCorrect: false,
          label:
            "Harga gabah di tingkat petani selalu mengalami naik turun (fluktuasi) selama empat bulan terakhir",
        },
        {
          isCorrect: false,
          label:
            "Harga gabah di tingkat petani berbanding terbalik dengan harga pembelian pemerintah terhadap GKP",
        },
        {
          isCorrect: false,
          label:
            "Selisih harga gabah dengan harga pembelian pemerintah sama besar pada Maret dan April",
        },
      ],
    },
  },
};

export default item;
