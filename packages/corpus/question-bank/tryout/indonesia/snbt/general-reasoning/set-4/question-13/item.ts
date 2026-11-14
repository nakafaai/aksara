import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "logical-equivalence",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua mahasiswa yang sudah mengikuti pelatihan keselamatan dan membawa kartu laboratorium boleh meminjam alat laboratorium.",
        },
        {
          correct: false,
          label:
            "Ada mahasiswa yang boleh meminjam alat laboratorium meskipun ia belum mengikuti pelatihan keselamatan atau tidak membawa kartu laboratorium.",
        },
        {
          correct: false,
          label:
            "Jika seorang mahasiswa tidak membawa kartu laboratorium, ia tidak boleh meminjam alat laboratorium.",
        },
        {
          correct: false,
          label:
            "Jika seorang mahasiswa belum mengikuti pelatihan keselamatan dan tidak membawa kartu laboratorium, ia tidak boleh meminjam alat laboratorium.",
        },
        {
          correct: true,
          label:
            "Jika seorang mahasiswa belum mengikuti pelatihan keselamatan atau tidak membawa kartu laboratorium, ia tidak boleh meminjam alat laboratorium.",
        },
      ],
    },
  },
};

export default item;
