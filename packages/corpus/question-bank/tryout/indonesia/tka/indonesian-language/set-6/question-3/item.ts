import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "child-helmets",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pernyataan itu terbukti karena pemakai helm bertambah 400 anak",
        },
        {
          correct: false,
          label: "pernyataan itu salah karena pemakaian helm justru turun",
        },
        {
          correct: false,
          label:
            "pernyataan itu tepat karena guru mengajarkan cara memakai helm",
        },
        {
          correct: false,
          label:
            "pernyataan itu tidak relevan karena jumlah anak pada kedua pengamatan berbeda",
        },
        {
          correct: true,
          label:
            "pernyataan itu terlalu jauh karena data hanya menghitung helm yang dipakai, bukan kecelakaan atau cedera",
        },
      ],
    },
  },
};

export default item;
