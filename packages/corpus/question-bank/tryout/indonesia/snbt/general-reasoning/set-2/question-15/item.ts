import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Harga pembelian pemerintah untuk GKP tetap dan tidak berubah dari Januari sampai April",
        },
        {
          correct: false,
          label:
            "Harga pembelian pemerintah terhadap gabah, GKP, petani selalu mengalami penurunan dari Januari hingga April",
        },
        {
          correct: false,
          label:
            "Harga gabah di tingkat petani selalu mengalami naik turun (fluktuasi) selama empat bulan terakhir",
        },
        {
          correct: false,
          label:
            "Harga gabah di tingkat petani berbanding terbalik dengan harga pembelian pemerintah terhadap GKP",
        },
        {
          correct: false,
          label:
            "Selisih harga gabah dengan harga pembelian pemerintah sama besar pada Maret dan April",
        },
      ],
    },
  },
};

export default item;
