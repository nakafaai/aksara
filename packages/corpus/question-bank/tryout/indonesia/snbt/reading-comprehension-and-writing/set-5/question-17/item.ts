import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji daftar pemeriksaan sebelum merekam akan diulang kembali oleh tim.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji daftar pemeriksaan sebelum merekam demi memperoleh bukti yang lebih kuat.",
        },
        {
          correct: true,
          label:
            "Tim akan mengulang uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang daftar pemeriksaan sebelum merekam yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
