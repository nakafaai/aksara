import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji kartu bergambar untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: true,
          label:
            "Tim akan mengulang uji kartu bergambar untuk memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji kartu bergambar akan diulang kembali oleh tim.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan pengulangan kembali atas uji kartu bergambar demi bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji kartu bergambar yang sebelumnya sudah diuji untuk memperoleh bukti lebih kuat.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
