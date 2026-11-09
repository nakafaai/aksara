import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "library-visits",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Rata-rata banyak pengunjung per hari selama $$10$$ hari pada grafik adalah $$43{,}5$$.",
        },
        {
          correct: true,
          label:
            "Agar rata-rata $$11$$ hari paling sedikit $$45$$, pengunjung pada hari Sabtu harus paling sedikit $$60$$ orang.",
        },
        {
          correct: false,
          label:
            "Jika pengunjung pada hari Sabtu $$45$$ orang, rata-rata $$11$$ hari tetap $$43{,}5$$.",
        },
        {
          correct: true,
          label:
            "Jika pengunjung pada hari Sabtu $$43$$ orang, rata-rata $$11$$ hari lebih kecil daripada rata-rata $$10$$ hari.",
        },
        {
          correct: false,
          label:
            "Jangkauan banyak pengunjung selama $$10$$ hari pada grafik adalah $$20$$.",
        },
      ],
    },
  },
};

export default item;
