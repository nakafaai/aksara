import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "science-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Contoh itu mendukung keberatan bahwa sitasi tidak menangkap manfaat penelitian bagi pemakai yang bukan peneliti.",
        },
        {
          correct: false,
          label:
            "Contoh itu menjawab klaim Teks A bahwa selisih sitasi di Universitas Tirta Raya disebabkan oleh bahasa.",
        },
        {
          correct: true,
          label:
            "Contoh itu ikut mendasari usul agar hasil penelitian terbit lengkap dalam bahasa Indonesia.",
        },
        {
          correct: false,
          label:
            "Contoh itu menunjukkan bahwa bahasa Indonesia mampu membentuk istilah baru untuk hal baru.",
        },
        {
          correct: false,
          label:
            "Contoh itu membantah bahwa artikel berbahasa Inggris menjangkau lebih banyak peneliti di luar negeri.",
        },
      ],
    },
  },
};

export default item;
