import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "experiment-design",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Memutar musik di kandang selama sebulan, lalu membandingkan produksi susunya dengan produksi pada bulan yang sama tahun lalu.",
        },
        {
          correct: false,
          label:
            "Memutar musik hanya di kandang sapi yang paling banyak menghasilkan susu, lalu membandingkannya dengan sapi lain.",
        },
        {
          correct: false,
          label:
            "Menanyakan pendapat beberapa peternak lain yang pernah memutar musik di kandang sapi mereka.",
        },
        {
          correct: false,
          label:
            "Memutar musik di kandang semua sapi, lalu mencatat apakah produksi susu naik pada minggu pertama.",
        },
        {
          correct: true,
          label:
            "Membagi sapi secara acak ke dua kandang serupa, memutar musik di satu kandang, lalu membandingkan susunya pada waktu yang sama.",
        },
      ],
    },
  },
};

export default item;
