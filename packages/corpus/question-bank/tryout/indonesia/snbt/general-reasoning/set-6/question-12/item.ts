import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "disjunctive-syllogism",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Rapat warga tetap diadakan di balai desa tanpa kursi tambahan.",
        },
        {
          correct: false,
          label: "Rapat warga dipindah ke balai desa sekaligus ditunda.",
        },
        {
          correct: true,
          label: "Rapat warga ditunda.",
        },
        {
          correct: false,
          label:
            "Kursi untuk rapat warga dipinjam dari tempat lain selain sekolah.",
        },
        {
          correct: false,
          label: "Rapat warga diadakan di tempat semula sesuai jadwal.",
        },
      ],
    },
  },
};

export default item;
