import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tidak ada anggota klub pencinta alam yang boleh mengikuti arung jeram.",
        },
        {
          correct: false,
          label:
            "Semua siswa yang sudah lulus uji renang boleh mengikuti arung jeram.",
        },
        {
          correct: true,
          label:
            "Sebagian siswa yang tidak boleh mengikuti arung jeram adalah anggota klub pencinta alam.",
        },
        {
          correct: false,
          label:
            "Sebagian anggota klub pencinta alam boleh mengikuti arung jeram.",
        },
        {
          correct: false,
          label:
            "Semua anggota klub pencinta alam yang bukan siswa kelas X boleh mengikuti arung jeram.",
        },
      ],
    },
  },
};

export default item;
