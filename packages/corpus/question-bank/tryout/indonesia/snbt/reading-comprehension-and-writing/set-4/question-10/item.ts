import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dengan aturan ukur yang sama, tim merencanakan uji label foto yang lebih panjang serta pemisahan data peminjam baru dan lama.",
        },
        {
          correct: false,
          label:
            "Dengan aturan ukur yang diubah, tim merencanakan uji label foto yang lebih panjang.",
        },
        {
          correct: false,
          label:
            "Tim akan mengulang hanya sesi label foto yang menghasilkan nilai tertinggi.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan label foto secara permanen sebagai pengganti uji lebih panjang.",
        },
        {
          correct: false,
          label:
            "Tim merencanakan uji lebih panjang dengan menggabungkan data peminjam baru dan lama tanpa membedakannya.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
