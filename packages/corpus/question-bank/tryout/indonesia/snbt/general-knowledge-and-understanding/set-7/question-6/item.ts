import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "memberi undangan yang sama tanpa menyesuaikan hambatan peserta",
        },
        {
          correct: true,
          label:
            "membuka kesempatan nyata bagi kelompok dengan kebutuhan dan hambatan yang berbeda",
        },
        {
          correct: false,
          label: "menerima setiap usulan agar tidak ada kelompok yang kecewa",
        },
        {
          correct: false,
          label:
            "menyerahkan keputusan sepenuhnya kepada kelompok yang hadir paling banyak",
        },
        {
          correct: false,
          label: "mengukur keterlibatan hanya dari jumlah orang yang datang",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
