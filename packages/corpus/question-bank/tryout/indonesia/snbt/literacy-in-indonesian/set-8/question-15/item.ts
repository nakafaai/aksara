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
          correct: false,
          label:
            "membuktikan bahwa penelitian tentang kebakaran gambut tidak pernah dikutip oleh peneliti dari luar negeri",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa kebakaran gambut adalah masalah terbesar dalam penelitian di Indonesia",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa artikel berbahasa Inggris berasal dari proyek dengan dana besar",
        },
        {
          correct: true,
          label:
            "menunjukkan bahwa pemakai terpenting penelitian bisa bukan peneliti, sehingga sitasi tidak menangkap manfaatnya",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa petani dan petugas pemadam di sekitar gambut menolak membaca artikel berbahasa Inggris",
        },
      ],
    },
  },
};

export default item;
