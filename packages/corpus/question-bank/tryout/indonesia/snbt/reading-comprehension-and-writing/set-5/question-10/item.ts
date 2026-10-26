import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dengan ukuran kesepakatan yang diubah, tim akan menguji contoh foto pada lebih banyak jenis pohon.",
        },
        {
          correct: true,
          label:
            "Dengan ukuran kesepakatan yang sama, tim akan menguji contoh foto pada lebih banyak jenis pohon.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang hanya sesi yang menghasilkan kesepakatan tertinggi.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan contoh foto secara permanen tanpa pengujian lanjutan.",
        },
        {
          correct: false,
          label:
            "Tim akan menguji contoh foto hanya pada jenis pohon yang sudah terwakili.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
