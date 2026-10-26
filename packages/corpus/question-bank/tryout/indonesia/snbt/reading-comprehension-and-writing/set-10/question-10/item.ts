import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim merencanakan uji lebih lama dengan aturan pengukuran yang diubah.",
        },
        {
          correct: false,
          label: "Tim akan mengulang hanya pertemuan dengan hasil tertinggi.",
        },
        {
          correct: true,
          label:
            "Tim merencanakan uji lebih lama dengan resep lebih beragam dan aturan pengukuran yang sama.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan susunan baru secara permanen sebagai pengganti uji lanjutan.",
        },
        {
          correct: false,
          label: "Tim merencanakan uji lebih lama dengan resep yang sama saja.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
