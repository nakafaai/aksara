import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji peta kecil dengan waktu tempuh untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji peta kecil dengan waktu tempuh akan diulang kembali oleh tim.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji peta kecil dengan waktu tempuh demi memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang peta kecil dengan waktu tempuh yang telah diuji sebelumnya.",
        },
        {
          correct: true,
          label:
            "Tim akan mengulang uji peta kecil dengan waktu tempuh untuk memperoleh bukti yang lebih kuat.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
