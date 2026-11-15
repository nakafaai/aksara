import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "science-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kajian itu hanya mencakup $$400$$ artikel, jadi perlu mengulang kajian di lebih banyak universitas agar jumlahnya cukup.",
        },
        {
          correct: false,
          label:
            "Selisih sitasi bisa berasal dari dana dan pengalaman tim, jadi perlu menghitung sitasi selama sepuluh tahun, bukan lima tahun.",
        },
        {
          correct: true,
          label:
            "Selisih sitasi bisa berasal dari dana dan pengalaman tim, jadi perlu membandingkan sitasi artikel kedua bahasa yang dana proyek dan pengalaman timnya setara.",
        },
        {
          correct: false,
          label:
            "Selisih sitasi bisa berasal dari dana dan pengalaman tim, jadi perlu menghitung berapa petugas pemadam dan petani yang membaca artikel berbahasa Indonesia.",
        },
        {
          correct: false,
          label:
            "Sitasi tidak mengukur manfaat bagi pemakai yang bukan peneliti, jadi perlu membandingkan sitasi artikel kedua bahasa yang dana dan timnya setara.",
        },
      ],
    },
  },
};

export default item;
