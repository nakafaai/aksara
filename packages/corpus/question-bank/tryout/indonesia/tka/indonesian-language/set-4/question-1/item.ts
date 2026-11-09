import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "solar-lamps",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "data itu membuktikan lampu tenaga surya mengurangi kejahatan di desa",
        },
        {
          correct: false,
          label:
            "data itu tidak dapat dipakai sama sekali karena jumlah warganya terlalu sedikit",
        },
        {
          correct: true,
          label:
            "data itu menunjukkan kesan positif, tetapi jawabannya mungkin terpengaruh karena warga ditanya langsung oleh pemasang lampu",
        },
        {
          correct: false,
          label:
            "data itu menunjukkan bahwa 13 warga merasa kurang aman setelah lampu dipasang",
        },
        {
          correct: false,
          label:
            "data itu menggambarkan jumlah lampu yang mati setiap malam selama tiga bulan",
        },
      ],
    },
  },
};

export default item;
