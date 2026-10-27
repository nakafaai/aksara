import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hanya memuat kelompok yang jumlahnya paling besar",
        },
        {
          correct: false,
          label:
            "membagi jumlah responden sama rata tanpa melihat komposisi populasi",
        },
        {
          correct: true,
          label: "cukup mencerminkan ragam kelompok yang hendak dijelaskan",
        },
        {
          correct: false,
          label:
            "mengutamakan kelompok yang paling mudah dijangkau pengumpul data",
        },
        {
          correct: false,
          label:
            "memiliki responden banyak meskipun ragam kelompok penting tidak tercakup",
        },
      ],
    },
  },
};

export default item;
