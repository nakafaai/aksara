import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tim akan mengulang uji kode pengembalian pada setiap gagang untuk memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji kode pengembalian pada setiap gagang untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji kode pengembalian pada setiap gagang akan diulang kembali oleh tim.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji kode pengembalian pada setiap gagang demi memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang kode pengembalian pada setiap gagang yang telah diuji sebelumnya.",
        },
      ],
    },
  },
};

export default item;
