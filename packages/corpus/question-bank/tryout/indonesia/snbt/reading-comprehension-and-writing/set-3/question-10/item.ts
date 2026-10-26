import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dengan aturan pengukuran yang diubah, tim akan menguji simbol lebih lama pada beberapa kelompok.",
        },
        {
          correct: false,
          label:
            "Tim hanya akan mengulang sesi yang mencatat hasil tertinggi untuk simbol baru.",
        },
        {
          correct: false,
          label:
            "Tim akan menerapkan simbol baru secara permanen sebagai pengganti pengujian lanjutan.",
        },
        {
          correct: true,
          label:
            "Dengan aturan pengukuran yang sama, tim akan menguji simbol lebih lama pada beberapa kelompok.",
        },
        {
          correct: false,
          label:
            "Tim akan menguji simbol lebih lama pada satu kelompok saja tanpa pembanding.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
