import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "litium",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Litium yang bereaksi dengan elektrolit pada pengisian pertama terbuang tanpa memberi manfaat apa pun bagi baterai.",
        },
        {
          column: 1,
          label:
            "Selaput pemisah mencegah kedua elektrode tersambung secara langsung, tetapi tetap memungkinkan ion berpindah di antara keduanya.",
        },
        {
          column: 1,
          label:
            "Pada baterai yang jarang panas, lapisan tipis di permukaan anode tetap dapat menebal.",
        },
        {
          column: 2,
          label:
            "Sistem pengisian pada ponsel menurunkan arus sejak awal pengisian agar litium tidak mengendap di permukaan anode.",
        },
      ],
    },
  },
};

export default item;
