import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
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
};

export default item;
