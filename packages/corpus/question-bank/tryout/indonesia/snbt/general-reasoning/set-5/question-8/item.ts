import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Sebagian warga Jakarta memiliki akta kelahiran dan KTP",
        },
        {
          correct: false,
          label: "Semua warga Jakarta memiliki akta kelahiran dan KTP",
        },
        {
          correct: false,
          label:
            "Semua warga Jakarta hanya memiliki salah satu dari akta kelahiran atau KTP",
        },
        {
          correct: false,
          label:
            "Ada warga Jakarta di atas $$17$$ tahun tidak memiliki akta kelahiran namun memiliki KTP",
        },
        {
          correct: false,
          label:
            "Sebagian warga Jakarta tidak memiliki akta kelahiran namun mempunyai KTP",
        },
      ],
    },
  },
};

export default item;
