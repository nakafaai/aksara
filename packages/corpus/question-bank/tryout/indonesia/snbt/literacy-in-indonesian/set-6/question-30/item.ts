import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "dawn-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ajakan agar pembeli datang ke pasar setelah matahari terbit saja",
        },
        {
          correct: false,
          label:
            "keluhan bahwa harga di pasar subuh selalu lebih mahal daripada siang",
        },
        {
          correct: true,
          label:
            "gambaran kerja keras yang selesai sebelum kebanyakan orang memulai hari",
        },
        {
          correct: false,
          label:
            "pujian bahwa matahari membawa keuntungan besar bagi para pedagang",
        },
        {
          correct: false,
          label:
            "kritik bahwa orang-orang di pasar subuh malas dan pulang terlalu cepat",
        },
      ],
    },
  },
};

export default item;
