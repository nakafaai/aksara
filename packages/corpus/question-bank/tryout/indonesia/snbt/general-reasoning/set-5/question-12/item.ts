import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jika jumlah penonton dibatasi $$300$$ orang, pertandingan final dipindahkan ke gedung olahraga.",
        },
        {
          correct: false,
          label:
            "Jika pertandingan final tidak dipindahkan ke gedung olahraga, jumlah penonton tidak dibatasi $$300$$ orang.",
        },
        {
          correct: true,
          label:
            "Jika jumlah penonton tidak dibatasi $$300$$ orang, pertandingan final tidak dipindahkan ke gedung olahraga.",
        },
        {
          correct: false,
          label:
            "Jika siswa kelas X mendapat tiket, mereka menonton pertandingan final secara langsung.",
        },
        {
          correct: false,
          label:
            "Jika siswa kelas X tidak mendapat tiket, pertandingan final dipindahkan ke gedung olahraga.",
        },
      ],
    },
  },
};

export default item;
