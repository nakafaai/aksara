import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada Senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          correct: false,
          label:
            "pada Senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji kode pengembalian pada setiap gagang payung.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji kode pengembalian pada setiap gagang payung",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
