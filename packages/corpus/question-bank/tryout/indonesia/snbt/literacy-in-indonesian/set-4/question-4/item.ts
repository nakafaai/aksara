import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "antibiotic-resistance",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menunjukkan bahwa bahaya kekebalan bakteri sudah dikenali sejak awal masa antibiotik.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa penisilin tidak lagi dapat dipakai untuk mengobati infeksi apa pun.",
        },
        {
          correct: false,
          label:
            "Menjelaskan cara Fleming menemukan penisilin di laboratoriumnya.",
        },
        {
          correct: false,
          label:
            "Menegaskan bahwa Hadiah Nobel sebaiknya diberikan kepada penemu obat.",
        },
        {
          correct: false,
          label:
            "Membandingkan penisilin dengan antibiotik yang ditemukan sesudah tahun 1980-an.",
        },
      ],
    },
  },
};

export default item;
