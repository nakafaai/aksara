import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji contoh pencatatan waktu suara untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: true,
          label:
            "Tim akan mengulang uji contoh pencatatan waktu suara untuk memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji contoh pencatatan waktu suara akan diulang kembali oleh tim.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji contoh pencatatan waktu suara demi memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang contoh pencatatan waktu suara yang telah diuji sebelumnya.",
        },
      ],
    },
  },
};

export default item;
