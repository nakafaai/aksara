import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menunjukkan bahwa selisih antartitik sudah muncul di dasar rantai makanan, sehingga lebih banyak metilmerkuri memang masuk ke rantai makanan di rawa.",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa ikan pemakan tumbuhan dari hilir juga sudah tidak layak dikonsumsi menurut batas yang dipakai tim.",
        },
        {
          correct: false,
          label:
            "menjelaskan bahwa alga di hilir tumbuh dalam air yang mengandung merkuri total lebih tinggi daripada air di hulu.",
        },
        {
          correct: false,
          label:
            "menghapus keraguan akibat ukuran tubuh ikan yang tidak dicatat, karena perbedaan ukuran hanya memengaruhi ikan pemangsa.",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa ikan pemangsa di hilir memperoleh kadar tertingginya dengan memakan ikan pemakan tumbuhan di rawa.",
        },
      ],
    },
  },
};

export default item;
