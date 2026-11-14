import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "growth-mindset",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pola pikir bertumbuh sebaiknya ditinggalkan karena efek rata-ratanya terlalu kecil untuk dirasakan siswa.",
        },
        {
          correct: true,
          label:
            "Intervensi pola pikir bertumbuh memberi manfaat yang kecil dan tidak merata, tetapi tetap layak dipakai sebagai pelengkap karena murah.",
        },
        {
          correct: false,
          label:
            "Pola pikir bertumbuh baru berhasil jika guru rajin memuji usaha siswa.",
        },
        {
          correct: false,
          label:
            "Intervensi pola pikir bertumbuh paling tepat diberikan kepada siswa berprestasi tinggi di sekolah yang lingkungannya mendukung.",
        },
        {
          correct: false,
          label:
            "Pola pikir bertumbuh adalah cara termurah untuk mengangkat prestasi semua siswa.",
        },
      ],
    },
  },
};

export default item;
