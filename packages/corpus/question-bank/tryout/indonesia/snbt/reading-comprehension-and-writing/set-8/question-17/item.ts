import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim akan mengulang kembali uji formulir dengan pilihan lokasi terstruktur untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          correct: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji formulir dengan pilihan lokasi terstruktur akan diulang kembali oleh tim.",
        },
        {
          correct: true,
          label:
            "Tim akan mengulang uji formulir dengan pilihan lokasi terstruktur untuk memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji formulir dengan pilihan lokasi terstruktur demi memperoleh bukti yang lebih kuat.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang formulir dengan pilihan lokasi terstruktur yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
