import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "kopi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "keberatan ketua kelompok terhadap kulit dari buah yang belum merah penuh",
        },
        {
          correct: false,
          label:
            "keberatan para pengurus karena harus menimbang buah yang sudah dipilah",
        },
        {
          correct: false,
          label:
            "keberatan para pemetik karena buah yang merah penuh sulit ditemukan",
        },
        {
          correct: false,
          label:
            "keberatan para pemetik karena upah per kilogram buah terlalu rendah",
        },
        {
          correct: true,
          label:
            "keberatan para pemetik karena memilah buah memperlambat kerja sehingga mengurangi upah mereka",
        },
      ],
    },
  },
};

export default item;
