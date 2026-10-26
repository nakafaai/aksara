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
            "Tim akan mengulang uji tanda genre untuk memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji tanda genre untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji tanda genre akan diulang kembali oleh tim.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji tanda genre demi memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang tanda genre yang telah diuji sebelumnya.",
        },
      ],
    },
  },
};

export default item;
